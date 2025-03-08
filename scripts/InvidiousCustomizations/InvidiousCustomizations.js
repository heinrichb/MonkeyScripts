// ==UserScript==
// @name            Invidious Customizations
// @namespace       https://invidious.example.com/
// @version         2024-03-13
// @description     Auto sets playback speed on Invidious based on the channel and improves the site's UI for a better viewing experience.
// @author          Brennen Heinrich
// @match           https://invidious.example.com/watch*
// @icon            data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAE60lEQVR42q1XQ5glaRCstX1a277ON7Zt27batm3btm3bto1/Mw5vWqra7jLTiOSELP/888/b69ev/3nXrl1bDh48eP7o0aN3ab9H1xfo2dYNGzb88u+//77NLeXy559/vrJ169bfTp48ee/Ro0f+Wlpalfb29j1+fn4joaGh49hx7eDg0KutrV31+PHjwFOnTj2kf/4ggV9dFPNt27b9evHiRS1NTc3asLCw8fLyctbW1sa6u7tZT0/PlB3P8K6iooJFRESMk6D1ly5d0tu+ffsfH3300UuCGK9evfrNI0eOXFBQUCiNi4tjLS0tDAy6urpYZ2fnvDu+wbetra0sISGBKSkpVZCbrqxZs4afazZu3PjRuXPnNGxtbQfq6upATERc8I5/6+vrGbln8MKFC3qbNm36ZF7mFEQfktlMfXx8xtrb2/lozMsiHR0dzN/ff+zKlSvWpODHszJfvnz562fPnlX28vIa5Uu8AwwECEPBOkbW1Vy5cuWbMwSgVDpqbm7ei0Diw1izqJNdzOhkZS38hYBVra2t+w8dOnR6CvPNmzd/JSEhkVlZWcnL7K0dnexQSif7OryTpTaQr7v4u6O6uppJS0vnbdmy5bsXAlCOPw4KCuIdcNC4iDRPaehi7R3CA5NSmp0+fVqSw7J27drPJSUl02trayEhb00a6utYclLi/wpKZIasrGwOVdWvuX379h1xdHTsh2RCtEhKSmJPnz5lVVVVgrMF/7u6ug7u37//DHf+/HkzEBMoAHKbUTAxSlncCxYgLS2NUZW14x48eJBeVlYmSIumpiZmZ2fHbt++zag/MBQsIf/jWwQ89Y18TkpKqqWhoUGQ9Pn5+Sw8PJx5e3szKrMoMoKtACXk5OS6OEVFxYHm5mZBAkRGRrLs7GyGwL137x40EWwF9ApVVdVRwQKgUEFzUZ/w9PRksEJAQADuBQsgxAXQEO0WJp9SWO7evcuePHmC9MIzIS7o5O7fv58mCkK+6ZeYmIjrF8/c3d0ZrBAYGIh7vooggPM4ag4mIMjXfNAewEQkMM6oBXfu3EFd4GUF8EpNTUUa2nJ79+49RDndj594VDD4H/6bQdDNzY3BCsHBwbhfUAAXFxcUolMcIZVPqRGlLlCK8RMiH3AL17PmNerC8+fPGWIKz+ZTREZGJnvdunVfcVhOnDjxUOS/hZpIXl4erucqr+zYsWMsJCRkTlp4TkCWEXAV40QLQaUvxMTE0hEYc0kOrVB+a2pq5q1ut27dmjMWRPFCzS+HIMC3UzDBgQMHDpmZmfVQns/4EZAqOjqaGRsbs5SUlHnjBJZUUVGBpXA/A5BYWlr2UQ85MQMRLVu27DXq0fIeHh6jYDhLAcIOIryQz2w0gDUJ9qmuWLHijblA6fuUGobAhUsJSkHL19d3jACvOYHSDxdCxh+QlCpWVlZ98PdiYTmyCxCf2r4mID/HZ1m1atUbhw8fPk2lsigmJoahVwgdTDDMYKjBcIMhB8MOJ3Sh+e4nklxVTU2tilJrvLS0FEVIxGTKWIZneIeyjnlRQ0OjhoYRTRrvfuEWs/z6668vU8r8RLXiJoEXb3V19VIbG5suqojDBGRHqfKN4prM3E1Myx4+fOhL394h1PvLH3/88Qq3lAsRfJNA7Pc7d+5cT2l7kkx7FTtdn6JnG6iy/UDT9FtCaP4Huc4TMWKLwA0AAAAASUVORK5CYII=
// @grant           none
// @require         http://code.jquery.com/jquery-3.7.1.min.js
// ==/UserScript==
const $ = window.jQuery;

/**
 * @typedef {"0.5x" | "0.75x" | "1x" | "1.25x" | "1.5x" | "1.75x" | "2x"} PlaybackSpeed
 */

/**
 * @typedef {Object} ChannelSettings
 * @property {PlaybackSpeed} playback_speed - The default playback speed for this channel.
 */

/**
 * @typedef {Object} Settings
 * @property {Record<string, ChannelSettings>} channels - A dictionary of YouTube channel names and their settings.
 */

/** @type {Settings} */
const settings = {
	channels: {
		"Channel Name": { playback_speed: "1.5x" },
		"Another Channel": { playback_speed: "2x" }
	}
};

$(document).ready(function () {
	"use strict";

	$("head").append(`<style>
		#contents { width: 100%; }
		#player-container { margin: 0; }

		#player-container .sponsorSkipObject { position: absolute; }
		#player-container .sponsorSkipObject img { max-height: 24px; }
		#player-container .sponsorSkipObject .sponsorSkipNoticeTableContainer {
			height: 50px;
			padding: 16px;
		}
		#player.vjs-playing,
		#player.vjs-scrubbing {
			z-index: 999;
			height: calc(100vw * 1.77);
			max-height: 100vh;
			margin-top: -70px;
		}
		#player.vjs-playing:not(:hover) > .vjs-control-bar {
			bottom: -30px !important;
			background-color: rgb(35, 35, 35);
		}
	</style>`);

	const videoStartedCheck = setInterval(() => {
		let sourceControls = $(
			".vjs-control-bar > .vjs-http-source-selector ul > li"
		);
		if (
			sourceControls.length &&
			$("#player")[0].className.split(/\s+/).indexOf("vjs-playing") > -1
		) {
			sourceControls[1].click();
			window.clearTimeout(videoStartedCheck);
			window.scrollTo(0, 0);
		}
	}, 1000);

	Object.keys(customSettings.channels).forEach((key) => {
		if ($("#channel-name")[0].innerText.includes(key)) {
			const channel = settings.channels[key];
			const playbackSpeedOptions = $(".vjs-playback-rate ul > li");
			for (let i = 0; i < playbackSpeedOptions.length; i++) {
				const speedOption = playbackSpeedOptions[i];
				speedOption.innerText.includes(channel.playback_speed)
					? speedOption.click()
					: 0;
			}
		}
	});
});
