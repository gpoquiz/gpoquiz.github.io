---
layout: defaultlayout.njk
title: Procedural Chasm Landscape Generation
excerpt: Procedurally generating chasms based on The Stormlight Archive
---
<!---
<iframe width="560" height="315" src="https://www.youtube.com/embed/BIJmYiCgFao" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
-->

<style>
img{width: 100%;}
</style>

The intent of this project was to 
1. Get more experience in UE5
2. Experiment with Landscapes 
3. Do something cool

[The Stormlight Archive](https://www.brandonsanderson.com/the-stormlight-archive-series/) is a high fantasy series.  The primary setting of the first book is a barren landscape of crevasses and plateaus 

![Fanart by exmakina](https://i.imgur.com/qIhI99t.png)
![Map from the book](https://i.imgur.com/JxVIZ9i.jpeg)


I wanted to find a way to mimic this landscape.  It would be my first foray into generating an open world, and I hoped to utilize the new Unreal Engine features: Nanite and World Partition.


The first thing I looked into was heightmaps.  Unreal has a nifty feature for generating landscapes from 16 bit grayscale images.

![Heightmap](https://i.imgur.com/63PlB1F.jpeg)
![Result](https://i.imgur.com/pQzuDoV.png)

I figured this would be a good starting point for generating a landscape.  Next on the list was actually generating the Heightmap.

After searching for some inspiration, I finally remembered [Voronoi Diagrams](https://www.wikiwand.com/en/Voronoi_diagram) from my computational geometry class.

![From Wikipedia](https://www.wikiwand.com/en/File:Euclidean_Voronoi_diagram.svg)

With enough tweaking, this would work nicely for the procedural aspect I was looking for.  I didn't feel like programming my own Voronoi library, so I looked for one.  [This one] claimed to be faster than many others, (and was the first c++ one to show on google) so I decided to use it.  

After downloading it and running the boilerplate, I had to find a graphics library that would let me draw the voronoi diagram in a way that mimicked a Heightmap.  I downloaded [SDL](https://www.libsdl.org/) first, and got a working image out of it!

![White edges](https://i.imgur.com/aily2Bq.png)
![Black edges](https://i.imgur.com/RIsWnQq.png)

Unfortunately for me, SDL turned out to be a little too low level for what I was looking for.  Outputting an image required an additional library, increasing line thickness required a different library, etc.  I looked for a simpler, but more feature rich graphics library to replace it.  I tried [Cairo](https://www.cairographics.org/), and then [SFML](https://www.sfml-dev.org/).  SFML turned out to be easier to simply replace the SDL functions in the existing code.  

Initial imports from the Voronoi Diagram had some jagged artifacts.  This was to be expected, especially when compared directly to the real heightmaps.

![Jagged Edges](https://i.imgur.com/pT7etas.png)
![Zoomed out](https://i.imgur.com/EkHdulL.png)

What the real heightmaps have is a gradient, even on a harsh edge.  One way to solve this problem is to supersample, AKA generate the image in a high resolution, and then lower the resolution.  I may try this later, but for now, I simply generate a gradient line.

![Heightmap](https://i.imgur.com/j8IfWfc.png)
![Landscape](https://i.imgur.com/el6N5Yk.jpeg)
![Top Down](https://i.imgur.com/6QyEkZ9.jpeg)

This smoothed out the edges a great deal.  However, I'm not sure how much smoothing is possible.  One limitation of SFML is that it doesn't support grayscale 16 bit output.  It's just drawing on an RGB scale.  Therefore, it is only an 8 bit scale.  That's 65,536 states reduced to 256, an over 99% loss.  

Actually, just figuring this out while writing this, but I suppose I can make the image in Red/Green Scale, and then convert that to 16 bit Grayscale.  This might require an OpenGL fragment shader of some kind.  That'll be a nice project.  

Regardless, I'll work with what I have for now.  

The next thing I added was some variance to the heights of the plateaus, to reduce the uniformity of the terrain.  Relatively simple, just fill each cell with a random value.

![Heightmap](https://i.imgur.com/Uh2GaSL.png)
![Landscape](https://i.imgur.com/ekZg8sH.png)
![Before/After](https://i.imgur.com/fzlSYxX.png)