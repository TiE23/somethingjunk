export default {
  port: 1337,
  dbUri: "mongodb://localhost:27017/rest-api-tutorial",
  saltWorkFactor: 10,
  minPasswordLength: 6,
  /**
   * How this works is that the access token lasts for just 15 minutes, but the
   * refresh token lasts for a whole year. What does that mean? It means that if
   * the access token is valid but expired (>15 minutes) the system will check
   * if their refresh token is valid and unexpired. If that is the case, the
   * user will be granted a new access token, seamlessly.
   * I think this is a basic style that I never figured out for Metric-Teacher -
   * how to re-issue access tokens.
   */
  accessTokenTTL: "30s",
  refreshTokenTTL: "60s",
  publicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDmZ74qH3JqDeGHTPCAR+vrg5RA
SWQi3hfZ/g0JsxE6mFtNVVFecOWpKx1BoMyfxQuOGi+9XtZjzIL+nL/x71YX9vox
+JCAn7mc3596mzwtnXRkX9wgz5QjyR/ijhQn/sbTl9ck1pHsMuGaD6PqRoAgJI4j
86OPRc+htZ4P1TqZtQIDAQAB
-----END PUBLIC KEY-----`,
  // This is for practice! It's no worry to be committing this to GitHub.
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQDmZ74qH3JqDeGHTPCAR+vrg5RASWQi3hfZ/g0JsxE6mFtNVVFe
cOWpKx1BoMyfxQuOGi+9XtZjzIL+nL/x71YX9vox+JCAn7mc3596mzwtnXRkX9wg
z5QjyR/ijhQn/sbTl9ck1pHsMuGaD6PqRoAgJI4j86OPRc+htZ4P1TqZtQIDAQAB
AoGBAJvAGW7EH0XN6FzcB9/Pvo1QPxFOC2D+nUUBVbLu14CyqVWXjQ+4Zad7u6U3
m9uNCgifbxImX+rKvup6784OKjV0nyC4y02oPa5hzoxU4aAxfE7aQuTejFvwaqvd
3hhW2pvyhAz9ZxyTFkKyQmyOL7dF3X2cj3AMP6sMPlzDjt4BAkEA9jha3P/PpSD7
qvGBy4hfR00xVwxuToRLyF2xn+NvgIg9v56amHfS7hsA5AAr3jfpT9nuKXpOA297
2/xgWXI1dQJBAO+Ok7gSC/Jt4GoIdnZ4gCiF5VJTvdJbyzdlj1BMWjSQF650J3HR
saicunmP8R253oakrjPDaSfvSS41nBpTC0ECQQDzQYIjzWhskEWUAb5mQ3k+jHku
s01XrUTh1A9lE+JZbkDzS9MYx2lRbMRYfgLZLQwIpBq0R+1DX6VTFehq9nbxAkA4
+3wty7UlzHcWIb8z/QPXH8plo9/COu2C1tiZLCBE4oWPjLeZPlz5E5bTtaaQAJdr
BZ8eVvwbcLLCmCPyqxBBAkEAzlqmfJVXPSHlPhuwRunyG/2K3kmXbzYA/yATY15Z
6oGENsZqYtnxjXktOUXYX4BVhEMM4XunKrGMMKNaISCkjg==
-----END RSA PRIVATE KEY-----`,
};
