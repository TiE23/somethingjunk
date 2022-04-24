# Kyle's Comments
Hello Apoorva! Hello Jake!

This project reminds me of one of Facebook's biggest and most complex components available. If I recall correctly it was called <PowerSearch> and boy, it took a day or two just to figure out how it worked. The amount of configurations, code-gen, and other boilerplate it required was an incredible thing to behold. But when you figured it out it had literally everything you could possibly imagine with a token search bar like this.

You'd create object shapes defined in HackLang, write special config classes that cited database schema, then a code-gen script called meerkat would generate complex, immutable JavaScript objects that were typed with FlowJS that you'd then (finally) import into your custom search component. If everything went to plan you'd have a search component like this with two dozen features.

Now, I didn't design this thing, and I barely recall the proper name for it, but was entirely fascinated by how it all worked. So, it's neat to tackle a little project like this as well.

## Extra things I did
I really hope you don't mind that I switched to using TypeScript for this little project. If it's not how you do things over at VS I promise it's not hard to follow my changes. Adding typing to a project just makes everything so much more obvious and clear even to those who don't use it.

I also added eslint with some rules I've used recently. Main differences is always using semi-colons, using double quotes, and using LF endings (some files had CRLF).

## Something I brought in
Lastly I adopted the use of my favorite module I've encountered in all of my time using React: Styled-Components. I believe Styled-Components does to CSS what JSX does for HTML - it elegantly wipes away the border between JSX and CSS.
