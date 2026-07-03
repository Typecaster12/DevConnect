# DevConnect - TaskSeparation.md

> Goal: Build the frontend first using mock data/API, then replace the
> mock layer with Express APIs.

## Project Rules

-   Build **one feature at a time**.
-   Never start backend until the UI + data flow works.
-   Every feature should have:
    -   UI
    -   Local state
    -   Mock data/API
    -   Component separation
-   Later, replace only the data source.

------------------------------------------------------------------------

# Overall Data Flow

    User Action
        ↓
    Component
        ↓
    Handler Function
        ↓
    Mock API / Fake Data
        ↓
    State Update
        ↓
    React Re-render
        ↓
    Updated UI

Later:

    User Action
        ↓
    React Component
        ↓
    Axios
        ↓
    Express API
        ↓
    MongoDB
        ↓
    JSON Response
        ↓
    State Update
        ↓
    UI

------------------------------------------------------------------------

# Folder Structure

    src/
      components/
      pages/
      layouts/
      hooks/
      services/
          mockApi.js
      data/
          users.js
          posts.js
      context/
      utils/

------------------------------------------------------------------------

# Milestone 1 --- Project Setup

## Task 1

-   Create React project
-   Install React Router
-   Create folder structure
-   Create Navbar + Layout

Done when: - Navigation works.

------------------------------------------------------------------------

# Milestone 2 --- Authentication UI

## Task 2

Pages: - Login - Register

Only UI.

## Task 3

Create fake authentication.

Data flow

    Login Form
        ↓
    submit()
        ↓
    mockLogin()
        ↓
    returns fake user
        ↓
    store in Context
        ↓
    Dashboard opens

Do NOT build JWT yet.

------------------------------------------------------------------------

# Milestone 3 --- Profile

## Task 4

Create profile page.

Fields: - name - bio - skills - github - linkedin - avatar

Use one mock user.

## Task 5

Edit Profile.

Flow

    Input
     ↓
    handleChange
     ↓
    state
     ↓
    Save
     ↓
    mockUpdateProfile()
     ↓
    updated UI

------------------------------------------------------------------------

# Milestone 4 --- Feed

## Task 6

Create Post Card component.

Contains - avatar - username - text - image(optional) - like button -
comment button

## Task 7

Render multiple posts using mock data.

Practice: - map() - keys - props

------------------------------------------------------------------------

# Milestone 5 --- Create Post

## Task 8

Build "Create Post".

Flow

    Textarea
     ↓
    Submit
     ↓
    mockCreatePost()
     ↓
    prepend post
     ↓
    Feed updates

------------------------------------------------------------------------

# Milestone 6 --- Like System

## Task 9

Click Like.

Flow

    Like Button
     ↓
    handleLike()
     ↓
    update likes
     ↓
    re-render

Backend later becomes: PATCH /posts/:id/like

------------------------------------------------------------------------

# Milestone 7 --- Comments

## Task 10

Open comments.

Task 11

Add comment.

Flow

    Input
     ↓
    Submit
     ↓
    mockAddComment()
     ↓
    comment list updates

------------------------------------------------------------------------

# Milestone 8 --- Search Developers

## Task 12

Search by: - name - skill

Use useMemo for filtering.

------------------------------------------------------------------------

# Milestone 9 --- Follow System

## Task 13

Follow / Unfollow.

Flow

    Button
     ↓
    toggleFollow()
     ↓
    state updates

------------------------------------------------------------------------

# Milestone 10 --- Dashboard

## Task 14

Cards: - Posts - Followers - Following - Likes

Use derived data (useMemo).

------------------------------------------------------------------------

# Milestone 11 --- Notifications

## Task 15

Render notification list from mock data.

------------------------------------------------------------------------

# Milestone 12 --- Polish

## Task 16

Loading UI

## Task 17

Error UI

## Task 18

Responsive Design

## Task 19

Reusable Buttons

## Task 20

Clean folder structure

------------------------------------------------------------------------

# Backend Replacement Plan

Replace features one by one.

1.  Login
2.  Register
3.  Profile
4.  Feed
5.  Create Post
6.  Like
7.  Comment
8.  Follow
9.  Search
10. Notifications

Never replace everything at once.

------------------------------------------------------------------------

# Definition of Done

Each feature is complete only if:

-   UI finished
-   Responsive
-   State works
-   Mock API works
-   No console errors
-   Components separated
-   Easy to replace with Express later
