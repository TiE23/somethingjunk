# Kyle's Comments
Hello Apoorva! Hello Jake!

This project reminds me of one of Facebook's biggest and most complex components available. If I recall correctly it was called <PowerSearch> and boy, it took a day or two just to figure out how it worked. The amount of configurations, code-gen, and other boilerplate it required was an incredible thing to behold. But when you figured it out it had literally everything you could possibly imagine with a token search bar like this.

You'd create object shapes defined in HackLang, write special config classes that cited database schema, then a code-gen script called meerkat would generate complex, immutable JavaScript objects that were typed with FlowJS that you'd then (finally) import into your custom search component. If everything went to plan you'd have a search component like this with two dozen features.

Now, I didn't work on that thing, and I barely recall the proper name for it, but I was entirely fascinated by how it all worked. So, it's neat to tackle a little project like this as well.

## How I approached this assignment
I basically did a speedrun of what I would do in a personal project.

I suppose this is just my way of demonstrating the way I work (in a time crunch) and write React. I would've liked to take more time but I figured if I turned in something that clearly took me the entire weekend wouldn't really be me performing this assignment to its spirit.

## Extra things I did
I really hope you don't mind that I switched to using TypeScript for this little project. If it's not how you do things over at VS I promise it's not hard to follow my changes. Adding typing to a project just makes everything so much more obvious and clear even to those who don't use it. Using TypeScript did take me extra time, though. But I thoroughly prefer using it over vanilla JS as it really helps everything work better in the end.

I also employed eslint with some rules I've used recently. Main differences is always using semi-colons, using double quotes, and using LF endings (some files had CRLF).

## Something I brought in
Lastly I adopted the use of my favorite module I've encountered in all of my time using React: Styled-Components. I believe Styled-Components does to CSS what JSX does for HTML - it elegantly wipes away the border between JSX and CSS.

## What I didn't do
I didn't write any tests.
I didn't bother setting up a debug launch process in VSCode.
I didn't leave doc comments for everything like I tend to do. I'm a heavy commenter.