/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Close_Session_DetailInputs */

const en_assist_tasks_close_session_detail = /** @type {(inputs: Assist_Tasks_Close_Session_DetailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close details`)
};

const zh_assist_tasks_close_session_detail = /** @type {(inputs: Assist_Tasks_Close_Session_DetailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭详情`)
};

/**
* | output |
* | --- |
* | "Close details" |
*
* @param {Assist_Tasks_Close_Session_DetailInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_close_session_detail = /** @type {((inputs?: Assist_Tasks_Close_Session_DetailInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Close_Session_DetailInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_close_session_detail(inputs)
	return zh_assist_tasks_close_session_detail(inputs)
});