/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Takeover_PendingInputs */

const en_assist_tasks_takeover_pending = /** @type {(inputs: Assist_Tasks_Takeover_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Taking over...`)
};

const zh_assist_tasks_takeover_pending = /** @type {(inputs: Assist_Tasks_Takeover_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`接手中...`)
};

/**
* | output |
* | --- |
* | "Taking over..." |
*
* @param {Assist_Tasks_Takeover_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_takeover_pending = /** @type {((inputs?: Assist_Tasks_Takeover_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Takeover_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_takeover_pending(inputs)
	return zh_assist_tasks_takeover_pending(inputs)
});