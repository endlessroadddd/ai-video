/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Integration_Step_SyncInputs */

const en_integration_step_sync = /** @type {(inputs: Integration_Step_SyncInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`2. Sync communities`)
};

const zh_integration_step_sync = /** @type {(inputs: Integration_Step_SyncInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`2. 同步社区`)
};

/**
* | output |
* | --- |
* | "2. Sync communities" |
*
* @param {Integration_Step_SyncInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_step_sync = /** @type {((inputs?: Integration_Step_SyncInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Step_SyncInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_step_sync(inputs)
	return zh_integration_step_sync(inputs)
});