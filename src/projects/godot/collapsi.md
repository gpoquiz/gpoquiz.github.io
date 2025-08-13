---
layout: defaultlayout.njk
title: Collapsi
excerpt: Digital version and AI for Collapsi
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/6vYEHdjlw3g?si=I66hoYNvqHpdBr-4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

[Play here on itch.io for free](https://gpoquiz.itch.io/)

I found the above video a few days after it came out, and I was impressed.  A simple ruleset using a standard 52 card deck that's complex enough to be enjoyable at all ages. I played 10 rounds with my wife and had a blast.  I lost a lot (she's much better at card games than I am), but thought that the game was simple enough that I could make a complete solver.  It's a 4x4 grid, so the maximum depth is 16.  And each move only has 4, 7, or 8 possible moves.  Compare that to chess, which has (generally) 40+ depth and can average 35 moves per turn.  35^40 / 8^16 = 2 * 10^47 times more states to consider.  8^16 is of course still not a small number (281 trillion), and so I was worried that a full depth search would still take an unreasonable amount of time.  This is pessimistic to the point of being incorrect, since the game only really has 378,378,000  unique states.  I was planning on using C++ anyways for performance (and practice), but it's not magic.  

However, after a day spent building the solver, I was pleasantly suprised.  Over 10 thousand games there were only 56 million end states (5.6 thousand states per game.)  Much less than anticipated.  And this was obvious in retrospect.  I did not need to traverse the full tree, only find the singular guaranteed path to victory.  And at .00295ms/end state that only took 1.5ms per game!  (I believe that my prior math is also wrong in some ways.  Or at least too pessimistic of a worst case scenario.  But even then, tree trimming still helps out.)  

Since I now had, functionally, a "chess-bot" for collapsi, I really wanted to make a digitial version.  I have been trying to learn godot on and off, but I haven't been able to pick a project and stick to it.  Digitizing a relatively simple card game would provide very clear goals and limit scope.  

The first thing I did was make a card set.  I wanted to make minimalistic cards and lettering, and so limited myself to 5x7 for the letters and 15x21 for the cards.  I used paint.net primarily, but used [PixilArt](https://www.pixilart.com/draw) for their mirroring tool.  

![Letters](https://i.imgur.com/suO9w4N.png)

Sorry, it's a sprite sheet and not formatted well for this website (I'm not changing it, just click "Open in new tab").  It's mostly all me, although I asked my artistically talented wife on advice for some of the trickier letters.  But it's obviously not perfect.  'M', 'W', and 'X' are particularly illegible.  But I'm very proud of how these turned out considering the limitations I set.  

![Cards](https://i.imgur.com/qLxgcSJ.png)

![Chip](https://i.imgur.com/2wnM7e0.png)

This is the final iteration for the cards.  It's not very easy to differentiate between suits, but that doesn't matter for this game so I took some artistic liberties.  It took a while to get something that I was happy with, but I'm especially proud of the card backs and Jacks.  

![Back](https://i.imgur.com/nMRH93b.png)
![Restart](https://i.imgur.com/bHs1sfF.png)

These back and restart buttons that I made later also took some effort. 

![More Cards](https://i.imgur.com/AEZgG19.png)

This was me fiddling with making a full deck set, in case I wanted to use it later or wanted to update collapsi with more cards.  Also includes some attempts at numbering with a 9x9.  Note to self, T for ten might work.  

After I had the cards ready, it was time to actually start on the game.  And by game I mean fiddling with UI and adding a lot of personal touches.

![Card Flipping](https://i.imgur.com/GcXfL7X.gif)

This card flipping and bouncing effect was pretty much the first thing I did.  It scales based on mouse velocity, stacks with repeated use, and is negated by the opposite direction.  It also maintains a minimum velocity until it's right side up, so that it doesn't stick on a random direction.  It seems like simple things (and they are), but I had a lot of fun figuring out the best (for me) ways to do this.  I also forced myself to do "Make it exist now, make it good later" approach.  There is also a parallax effect that persists between scenes using a "poker velvet" texture that I made (just noise).

I was going to take more inspiration from Balatro (etheral effects, shaky/rotating cards, etc.), but it didn't really play nice with the low resolution straight edge cards.  

Perfectionism is partially responsible for why I haven't fully completed a godot project (despite starting many.)  Learning to use the first solution I could think of was very helpful in boosting my confidence and in learning the language.  Being able to look at a problem and say "Oh I know a way to fix this" without needing to look up advice (On the "real" internet.  I did not use AI for any part of this project.)   made me feel more like I was programming and less like I was copy-pasting/ studying.  

![Card Dealing](https://i.imgur.com/nVCo1cP.gif)

This is a few different problems and animations that came at different times.

1. Gather all cards
2. Flip all cards to the next card back
3. Change scenes
4. Start scene with "deck" in center/same place as gather
5. Deal cards randomly to grid locations
6. Flip cards randomly
7. Bring in side controls
8. Do the inverse to go back

I would definitely centralize this more if I were to remake/refactor this.  I handled a lot of state on a per object basis, and (ab)used signals to communicate between them.  I also didn't have a dedicated "Main" scene that generated subscenes, so I had to make sure the transition between two completely unrelated scenes was as smooth as possible.  But I'm happy with the result.  You can't hear it in the gif (duh). but I also made my own sound effects for cards sliding and flipping.  

![Wiggle](https://i.imgur.com/U28jFht.gif) ![Hint](https://i.imgur.com/dG9JBuA.gif)

Card wiggle I made because it wasn't clear to my friends that playtested that it was an interactable button.  It also works for hinting your possible moves.  

![Restart](https://i.imgur.com/KuLxFro.gif)

Restarting isn't too complicated, just moving everything and re-initializing.

![Gameplay](https://i.imgur.com/oZ51ghO.gif)

I put off gameplay for relatively late into development (Main menu and dealing was finished first) because I had already front loaded the AI work.  There was of course effort put into managing the game state Godot-side, but nothing I'm particularly proud of.  The most complicated part was porting my C++ code to a GDExtension and loading it in.  It's obviously less documented/asked about than just normal gdscript stuff, so there were some issues that took some fiddling, but not too bad overall.  It was very satisfying seeing my solver code in real time.

After I was finished with everything, the next hurdle was making it playable on web.  The only difficulties were having to re-build my gdextension for web specifically, which also involved compiling some binaries from a different docs page than the default GDExtension how-to.  But otherwise it was playable!  In fact, I laid out the controls in a robust enough way that the window was almost resolution independent. 

![Resizing](https://i.imgur.com/uhOE6RS.gif)

(Ignore the thing that's obivously not resolution independent when actively scaling.)
This led me to see how it looked on mobile, and it was actually *so close* to being ok out of the box.  The cards were just a bit too small, and some of them overlapped.  Additionally Safari refused to display in landscape by default.  I added some quick checks for mobile/portait devices and uploaded.

![Mobile](https://i.imgur.com/BJfyEf9.png)

(They were around half the size before)  However, Safari was still not working perfectly, and changes I made destabilized the app so I had to revert.



There are a few things that I want to change if I have free time.

1. There is no tutorial.  There is a rules page which my sister refused to read.  So I would have an interactive or at least slideshow tutorial available.
2. Settings for volumes, animations, colors, resolutions, etc.
3. The game developer has made some variants and updates to the card game, so I would like to import them.
4. Difficulty settings.  The AI plays perfectly when it can, so it's unreasonably hard.
5. Online/local multiplayer.  Online especially would be challenging but fun.

But otherwise that's the game!  I'm very proud of it, and it took around a month.  I hope to keep making games and get faster at prototyping ideas I have, so that idea of knocking out an idea over a week isn't impossible.  If you're still here, thanks for reading!