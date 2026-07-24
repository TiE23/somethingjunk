@echo off
setlocal enabledelayedexpansion

rem === CONFIG: path to ffmpeg ===
set "FFMPEG=C:\Users\kyleg\bin\ffmpeg.exe"

rem === Require at least TWO files ===
if "%~2"=="" (
    echo Please drag at least TWO files onto this shortcut.
    timeout /t 2 /nobreak >nul 2>nul
    exit /b
)

rem === Temp files ===
set "TMPDIR=%TEMP%\ffconcat_tmp"
if not exist "%TMPDIR%" mkdir "%TMPDIR%"

set "UNSORTED=%TMPDIR%\unsorted.txt"
set "SORTED=%TMPDIR%\sorted.txt"
set "LISTFILE=%TMPDIR%\files.txt"

> "%UNSORTED%" (
    for %%F in (%*) do echo %%~fF
)

rem Sort paths alphabetically
sort "%UNSORTED%" /o "%SORTED%"

rem === Build concat list and count clips ===
set /a COUNT=0
> "%LISTFILE%" (
    for /f "usebackq delims=" %%F in ("%SORTED%") do (
        set /a COUNT+=1
        echo file '%%F'
    )
)

rem === Get first file (after sort) ===
for /f "usebackq delims=" %%F in ("%SORTED%") do (
    set "FIRST_FULL=%%F"
    set "FIRST_DIR=%%~dpF"
    set "FIRST_NAME=%%~nF"
    set "FIRST_EXT=%%~xF"
    goto got_first
)
:got_first

rem Normalize directory
if "%FIRST_DIR:~-1%"=="\" set "FIRST_DIR=%FIRST_DIR:~0,-1%"

set "N=%COUNT%"

rem === Build suffix chain from files 2..N ===
set "CHAIN="
set /a INDEX=0

for /f "usebackq delims=" %%F in ("%SORTED%") do (
    set /a INDEX+=1
    if !INDEX! gtr 1 (
        set "CURNAME=%%~nF"
        set "TRIMMED=!CURNAME:~0,-6!"

        rem Take LAST two chars after trimming last 6 chars
        set "TWO=!TRIMMED:~-2!"

        rem If filename is too short after trimming, just use whatever remains
        if not defined TWO set "TWO=!TRIMMED!"

        set "CHAIN=!CHAIN!+!TWO!"
    )
)

rem === Base output name ===
set "BASEOUT=%FIRST_NAME%_%N%!CHAIN!"

rem === Find next x by counting existing matching files ===
set /a NEXTX=1
for /f "delims=" %%G in ('dir /b "%FIRST_DIR%\%BASEOUT%_*%FIRST_EXT%" 2^>nul') do (
    set /a NEXTX+=1
)

set "OUTFILE=%FIRST_DIR%\%BASEOUT%_%NEXTX%%FIRST_EXT%"

echo.
echo Concatenating !COUNT! file(s) into:
echo   "!OUTFILE!"
echo.

"%FFMPEG%" -f concat -safe 0 -i "%LISTFILE%" -c copy -y "%OUTFILE%"

if errorlevel 1 (
    echo FFmpeg reported an error.
) else (
    echo Done.
)

echo.
timeout /t 2 /nobreak >nul 2>nul
endlocal
exit