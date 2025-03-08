// ==UserScript==
// @name			Jayuzumi Soundboard Downloader
// @namespace		https://jayuzumi.com/
// @version			2024-03-14
// @description		Adds batch download functionality to Jayuzumi soundboards by injecting buttons that allow users to quickly download multiple sound clips at once with properly formatted filenames.
// @author			Brennen Heinrich
// @match			https://jayuzumi.com/*
// @icon			https://www.google.com/s2/favicons?sz=64&domain=jayuzumi.com
// @grant			none
// @require			http://code.jquery.com/jquery-3.7.1.min.js
// ==/UserScript==
// Allow CORS must be enabled for script to work correctly
// TODO: If load more button is clicked, re-run injectDownloadButtons
const $ = window.jQuery;

const settings = {
	debug: true,
	testDownload: false,
	downloadBatch: 10
};

const printMsg = (message) => (settings.debug ? console.log(message) : 0);
const toPascalCase = (string) =>
	string
		? string.replace(
				/(\w)(\w*)/g,
				(_, u, l) => u.toUpperCase() + l.toLowerCase()
		  )
		: string;
const firstCharUppercase = (string) =>
	string.charAt(0).toUpperCase() + string.slice(1);

const downloadBatch = (lowerLimit, upperLimit) => {
	const soundboardCategory = toPascalCase(
		$("h1")[1]
			.innerText.toLowerCase()
			.replace(/ soundboard/g, "")
	);
	const $soundButtons = $("#soundboard .sound-button:not(.load-more-button)");
	printMsg(
		"Attempting to download sounds " + lowerLimit + "-" + upperLimit + "..."
	);

	const urls = $soundButtons.find("[data-url]");
	let index = lowerLimit - 1;
	while (index <= upperLimit - 1) {
		const soundClipName =
			soundboardCategory +
			" - " +
			firstCharUppercase(
				$($soundButtons[index]).find("p")[0].innerText.toLowerCase()
			);
		const fileName = soundClipName + ".mp3";
		const url = $(urls[index]).attr("data-url");

		if (settings.testDownload) {
			printMsg("Skipped test download #" + (index + 1) + ": " + fileName);
		} else {
			printMsg("Downloading file #" + (index + 1) + ": " + fileName);

			const xhr = new XMLHttpRequest();
			xhr.responseType = "blob";
			xhr.onload = () => {
				const a = document.createElement("a");

				a.href = window.URL.createObjectURL(xhr.response);
				a.download = soundClipName;
				document.body.appendChild(a);
				a.click();
				delete a;
			};
			xhr.open("GET", url);
			xhr.send();
		}
		index++;
	}
};

const injectDownloadButtons = () => {
	const downloadContainerID = "download-container";
	const downloadBtnClass = "download-btn";
	let downloadButtonsInjected = false;
	const $searchInput = $("#search-input");
	const $searchContainer = $(".search-container");
	printMsg("Attempting to inject download buttons...");

	if ($("#" + downloadContainerID).length === 0) {
		$("head").append(
			`<style>
			#` +
				downloadContainerID +
				` {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 10px 4px 10px 4px;
			}
			button.` +
				downloadBtnClass +
				` {
				background-color: #00e600;
				display: block;
				padding: 1px;
				color: white;
				text-transform: uppercase;
				cursor: pointer;
				transition: background-color 0.2s ease;
				font-family: "Anton", sans-serif;
				font-weight: 400;
				font-size: 16px;
				width: 20%;
				box-shadow: 5px 5px 0px #000000;
				border: 1px solid #000000;
				outline: 3px solid #000000;
			}
			button.` +
				downloadBtnClass +
				`:not(:first-of-type) { margin-left: 10px; }
		</style>`
		);

		$searchInput.on("keyup", injectDownloadButtons);
		$searchContainer.after('<div id="' + downloadContainerID + '"></div>');
	} else {
		$("#" + downloadContainerID).empty();
	}

	if ($searchContainer[0]) {
		const $downloadContainer = $("#" + downloadContainerID);

		let $soundButtons = $("#soundboard .sound-button:not(.load-more-button)");
		$soundButtons = $soundButtons.filter((index) => {
			const styleAttr = $($soundButtons[index]).attr("style");
			return !styleAttr?.includes("visibility: hidden");
		});

		for (let i = 0; i < $soundButtons.length / settings.downloadBatch; i++) {
			const lowerLimit = i * settings.downloadBatch + 1;
			let upperLimit = (i + 1) * settings.downloadBatch;
			if (upperLimit > $soundButtons.length) {
				upperLimit = $soundButtons.length;
			}
			$downloadContainer.append(
				'<button id="' +
					downloadBtnClass +
					"_" +
					i +
					'" class="' +
					downloadBtnClass +
					'">Download ' +
					lowerLimit +
					"-" +
					upperLimit +
					"</button>"
			);

			$("#" + downloadBtnClass + "_" + i).on("click", () => {
				downloadBatch(lowerLimit, upperLimit);
			});
		}
		downloadButtonsInjected = true;
	}
	if (downloadButtonsInjected) {
		printMsg("Download buttons injected!");
	} else {
		printMsg("Search container not found!");
	}

	$("#soundboard .sound-button.load-more-button").on(
		"click",
		injectDownloadButtons
	);
};

$(document).ready(() => {
	"use strict";

	injectDownloadButtons();
});
