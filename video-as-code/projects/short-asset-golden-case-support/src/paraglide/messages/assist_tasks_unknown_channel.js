/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Unknown_ChannelInputs */

const en_assist_tasks_unknown_channel = /** @type {(inputs: Assist_Tasks_Unknown_ChannelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unknown channel`)
};

const zh_assist_tasks_unknown_channel = /** @type {(inputs: Assist_Tasks_Unknown_ChannelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未知频道`)
};

/**
* | output |
* | --- |
* | "Unknown channel" |
*
* @param {Assist_Tasks_Unknown_ChannelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_unknown_channel = /** @type {((inputs?: Assist_Tasks_Unknown_ChannelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Unknown_ChannelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_unknown_channel(inputs)
	return zh_assist_tasks_unknown_channel(inputs)
});