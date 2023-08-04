---
tags: post
layout: defaultlayout.njk
title: Multidimensional Cellular Automata
eleventyNavigation:
  key: automata
  parent: unreal
  thumbnail: ../automata.png
  excerpt: Generalized Multidimensional Cellular Automata in Unreal Engine.
  title: Multidimensional Cellular Automata
---
<iframe width="560" height="315" src="https://www.youtube.com/embed/BIJmYiCgFao" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

This project was mainly a means of learning Unreal Engine 4 (UE4).  As working with N'th dimensional arrays can become computationally expensive, I would probably try to use something lower level like OpenGL for a true research project. In any case, cellular automata are relatively easy to implement in any language, and so should provide a good opportunity to learn UE4.

To start with, an introduction to [Cellular Automata](https://www.wikiwand.com/en/Cellular_automaton). They are also called "0 player games," because you can imagine them as board games that develop their states with 0 input.  They do this (generally) through adjacency conditions.  For example, the most famous cellular automaton is [Conway's Game of Life](https://www.wikiwand.com/en/Conway%27s_Game_of_Life), which has the conditions B3/S23.  A cell is "born" if it has 3 adjacencies. (where being born means the cell becomes active/alive), "survives" if it has 2 or 3 adjacencies (there is no change in state), and "dies" otherwise (the cell becomes inactive/dead).

<img src = "https://upload.wikimedia.org/wikipedia/commons/e/e5/Gospers_glider_gun.gif" style = "width: 25%; display: block;">

There are an extreme number of rules in a D dimensional automata, specifically

<code>
        <span>&Sigma;</span>
        i = (3<sup>d</sup> - 1)3<sup>d</sup> / 2
</code>

Where N = 3<sup>d</sup>. 

This makes rules like Conway's, where growth is limited but not stifled, exceedingly rare.  The discovery, therefore, of interesting automata is of note.  ([Bays] [1])



Beginning the project, I used the default "First Person Shooter" template.  I picked this template because I thought that being able to walk around a 3D automaton as it develops would be interesting. However, I didn't touch any of the template at first.  First was the "Grid" of the automaton, and the "Cells" it contains.

Programming an automaton is very easy.  All you need is a collection of cells (Organized in some way that you can check their adjacencies) and a collection of conditions.  My grid for this project would be an AActor with a TArray of Cells (StaticMeshComponents).  Additonally, TArrays for the born and die conditions.  The Cells would use a simple normal map to give them a "hollow" texture, as well as a gradient coloring to provide some sense of order.  Each cell would toggle its visibility based on its living state.

Most of the literature I read regarding cellular automata classified them in terms of their conditions: "Born" and "Survive".  I thought it would be easier to think about the cells having "Born" and "Die" conditions instead.  This was the wrong move.  As an example, one ruleset for 3 dimensions is B45S5 (Born with 4,5 adjacencies, Survive with 5).  ([Bays] [1]) This ruleset with my conditions is B45D12346789...26.  Much more cumbersome.  Born/Die was still usable in terms of coding logic, and so I leave the refactor for a different day. 

My first foray into UE4 involved just writing a 3D automaton.  The real fun came when converting from a 3d automaton to a generalizable N'th Dimensional Automaton.  The first required modification is in counting adjacencies.  For the 3D model, I used a triple for loop to iterate through each dimension.  Nesting for loops doesn't work when you don't know how many dimensions you will have.  

		
	
```
int adjacencyCount = 1;
for (int d : dimensions){adjacencyCount *= 3;}

int aliveCount = 0;
// go through each adjacency (3^D - 1 count)
for (int adjIndex = 0; adjIndex <= adjacencyCount - 1; adjIndex++)
{

    // skip self
    if (adjIndex == adjacencyCount / 2)
        continue;
    int div = 1;

    // build the coordinates of the current adjacent index
    TArray<int> adj;
    for (int d = 0; d < dimensions.Num(); d++)
    {
        int offset = adjIndex / div % 3 - 1;
        adj.Add(coords[d] + offset);
        div *= 3;
    }
    
    int index = coordsToIndex(adj);

    if (validIndex && cells[index]->isAlive)
    {
        aliveCount++;
    }
}
return adjacencyCount;
```

Widths of 3:
<br>2D = i\*3 + j
<br>3D = i\*9 + j\*3 + k

In general, the adjacencies around the index are contained in the 3 width hypercube of dimension D.  The offset is simply multiplied each time.  This same logic in reverse applies to converting coordinates to an index: 

	
    int index = 0;
    int offset = 1;
    for (int i = 0; i < dimensions.Num(); i++)
    {
        index += coords[i] * offset;
        offset *= dimensions[i];
    }
    return index;
	
The only difference is the coordinates are generalized, and so the offset depends on that row's dimensionality.  

Also interesting was visualizing an n'th dimensional grid.  Again, I used the principle of adjacency to help.  In other words, following the pattern: 

1D: adjacent Cells  
2D: adjacent 1D's  
3D: adjacent 2D's  
4D: adjacent 3D's  
etc.

And so, for instance, a 4D automaton is just a series of 3D automata in a line.

After the grid and cells were conceptualized, I began implementing interaction with the grid.  The basic concept would be a voxel style block placement, where you can edit the cells as if you were connecting/stacking bricks.  I used a raycaster from the camera, then tested checked which normal it contacts to see where a block is placed. 

I also wanted more floaty, space-like movement to be able to navigate above and below the automata.  This involved just stripping the first person shooter template of gravity, adding 'Up' and 'Down' movement keys, and modifying its air friction.  

Future Developments: Converting this project to learn OpenGL, Creating an orthograpic-third person view would definitely be easier to use (would make for a nice tablet demo if it runs well.)


Bays, C. (1987). Candidates for the Game of Life in Three Dimensions. Complex Systems, (1). Retrieved September 24, 2020, from https://content.wolfram.com/uploads/sites/13/2018/02/01-3-1.pdf.

[1]: https://content.wolfram.com/uploads/sites/13/2018/02/01-3-1.pdf
