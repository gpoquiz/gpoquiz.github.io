---
project: automata
environment: unreal
title: Multidimensional Cellular Automata
type: Game Development
---
This project was mainly a means of learning Unreal Engine 4 (UE4).
As working with N'th dimensional arrays can become computationally
expensive, I would probably try to use something lower level like OpenGL.
In any case, cellular automata are relatively easy to implement in
any language, and so should provide a good opportunity to learn UE4.

To start with, an introduction to
[Cellular Automata](https://www.wikiwand.com/en/Cellular_automaton).
They are also called "0 player games," because you can imagine them
as game boards that develop their states with 0 input.  They do this
through adjacency conditions.  For example, the most famous cellular automata
is [Conway's Game of Life](https://www.wikiwand.com/en/Conway%27s_Game_of_Life),
which has the conditions B3/S23.  A cell is "born" if it has 3 adjacencies.
(where being born means the cell becomes active/alive), "survives" if it has
2 or 3 adjacencies (there is no change in state), and "dies" otherwise
(the cell becomes inactive/dead).

<img src = "https://upload.wikimedia.org/wikipedia/commons/e/e5/Gospers_glider_gun.gif" style = "width: 25%; display: block;">

There are an extreme number of rules in a D dimensional automata, specifically

<code>
        <span>&Sigma;</span>
        i
</code> = (3<sup>d</sup> - 1)3<sup>d</sup> / 2

Where N = 3<sup>d</sup>. (Bays)

This makes rules like Conway's, where growth is limited but not
stifled, exceedingly rare.


Beginning the project, I used the default "First Person Shooter" template.
I picked this template because I thought that being able to walk 
around a 3D automaton as it develops would be interesting.



Bays, C. (1987). Candidates for the Game of Life in Three Dimensions.
Complex Systems, (1). Retrieved September 24, 2020, from https://content.wolfram.com/uploads/sites/13/2018/02/01-3-1.pdf.