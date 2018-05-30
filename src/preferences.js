import fetch from "isomorphic-fetch";
import { has } from "lodash";
import { formatUrl } from "./utils/url";
import { onClient } from "./utils/env";
import { createCookie } from "./utils/cookie";
import { I18N_LANGUAGE } from "./constants/strings";

import {
  SAVE_PLAYER_SEARCH,
  FAVORITE_PLAYER,
  PLAYER_SEARCH_INIT,
  UN_SAVE_PLAYER_SEARCH,
  UPDATE_THEME,
  UPDATE_LANGUAGE
} from "./constants/types";

export function savePlayerSearch(player) {
  return {
    type: SAVE_PLAYER_SEARCH,
    payload: {
      player
    }
  };
}
export function unSavePlayerSearch(player) {
  return {
    type: UN_SAVE_PLAYER_SEARCH,
    payload: {
      player
    }
  };
}
export function favoritePlayerSearch(player) {
  return {
    type: FAVORITE_PLAYER,
    payload: {
      player
    }
  };
}
export function initPlayerSearch() {
  return {
    type: PLAYER_SEARCH_INIT
  };
}

/**
 * Update theme
 */

export function updateTheme(theme) {
  return {
    type: UPDATE_THEME,
    payload: {
      theme
    }
  };
}
/**
 * Update language
 */

export function updateLanguage(language) {
  return {
    type: UPDATE_LANGUAGE,
    payload: {
      language
    }
  };
}

export function changeLanguageAndSetCookie(language) {
  return dispatch => {
    dispatch(updateLanguage(language));
    onClient(() => {
      createCookie(I18N_LANGUAGE, language);
    });
  };
}

export function changeTheme(theme) {
  return dispatch => {
    dispatch(updateTheme(theme));
    return fetch(formatUrl("/preferences/change_theme", true), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      method: "post",
      body: JSON.stringify({
        theme
      })
    })
      .then(response => response.json())
      .catch(err => console.log(err));
  };
}
