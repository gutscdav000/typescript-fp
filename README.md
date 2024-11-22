# typescript-fp

## notes for the talk

```
#+TITLE: Go High Level

* Intro
** bring some level of typesafety to languages that let you develop quickly
*** EX: typescript, python, go
*** Shift Bugs and Errors from runtime to Compile time
*** make implicit error channels or code paths explicit

* Typesafe Pattern Matching
** Message Service
*** Naive
**** V1 unsafe with if statements
**** V2 unsafe with pattern matching
**** Cardinal Sin of programming Languages: .exhaustive()
***** The domain of IMessage is unbounded, MessageType is bounded
***** Using a language for features for which it was not intended
*** Typed
** Hello Service
** LanguagePreference
*** Maybe: Better null & undefined handling
*** Either for better error handling
*** talk about combinators
**** Monoids in the Category of endofunctors
***** Monoid is a combinator with 'combine' defined. e.g. '+'
***** Functors: A container that maps between categories

* sweeping generalities
** prompt errors: MessageTyped vs extends Error
** Nominal Typing verses Structural typing
*** type's verses classes in typescript
**** types have a bounded domain, classes do not
**** Nominal A cat is a cat. new Cat() is a cat
**** Structural {type: "cat", message: "meow"} is a cat, but so is anything matching that shape
*** Other languages solve this better, but Typescript is good enough for CRUD services
```
