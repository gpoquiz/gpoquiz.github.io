---
layout: defaultlayout.njk
title: Google VR Quiz Game
background: /images/backgrounds/vrquiz_bg.png
eleventyNavigation:
  key: vrquiz
  parent: unity
  thumbnail: /images/thumbs/vrquiz.png
  excerpt: A multiplayer quiz game for GoogleVR.
---
<iframe width="560" height="315" src="https://www.youtube.com/embed/Y6JbmzztWYg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

This project was a a group project done for my graduate degree.  We wanted to pick a project that would be interesting, but not taxing in terms of required man hours.  To start, we decided that a simple VR quiz game, where you look at the answers to select them, would be an easy enough introduction to Unity.  Our professor encouraged the class to make their project at least somewhat Covid-19 related, and so we tacked on a multiplayer component.  The intent was to mimic Kahoot stlye quizzes (essentially classroom competitive quizzes.)  Our professor also required more usage of the 3D space that the game occupied, which I will go into later.  

Our group's first step was to research the mutliplayer options we had for Unity.  The major positives for us were free development testing (up to 20 concurrent users), innate crossplatform implementations, (which means we could debug the mobile deployments better, as well as make no changes between our android versions and the Unity editor,) and the advertised ease of implementation.  

My groupmates and I started off with the [photon tutorial](https://doc.photonengine.com/en-us/pun/v2/demos-and-tutorials/pun-basics-tutorial/intro), which was instructive, but far from comprehensive.  The first few parts of the tutorial also went over some Unity basics, which the course failed to provide.  This tutorial was helpful, but failed to mention features like RPC's (functions that you can call across clients) that the documentation describes as a feature that "sets PUN aside from other Photon packages."  Part of this frustration may also be my general lack of knowledge regarding networking.  Regardless, the package was fun to work with, and provided an easy implementation of networking (although I have no alternatives to compare to.)  

For our kahoot ~~ripoff~~ inspired game, I wanted there to be some sort of additional challenge to the quizzes.  So, instead of just clicking on the answer, I wanted the answer choices to revolve around the quiz.  It's not a significant change, but it meant that I could have fun with the models, textures, and motion of the answers.  At first I had the models revolve in a circle around the quiz (on the same plane as the quiz), but the space the answers took in relation to the quiz was too much in my opinion.  So I changed the movement path to a rectangle around the quiz instead.  I also made the selected answer choice rotate on its own axis while it revolved around the quiz, as a nice effect.  
