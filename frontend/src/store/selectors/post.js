import { createSelector } from '@reduxjs/toolkit';


export const postSelector = (state) => state.post;

export const editPostSelector = createSelector(postSelector, (post) => post.editPost);