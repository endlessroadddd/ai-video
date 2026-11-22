/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Integration_Step_RefreshInputs */

const en_integration_step_refresh = /** @type {(inputs: Integration_Step_RefreshInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`3. Refresh community list`)
};

const zh_integration_step_refresh = /** @type {(inputs: Integration_Step_RefreshInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`3. 刷新社区列表`)
};

/**
* | output |
* | --- |
* | "3. Refresh community list" |
*
* @param {Integration_Step_RefreshInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_step_refresh = /** @type {((inputs?: Integration_Step_RefreshInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Step_RefreshInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_step_refresh(inputs)
	return zh_integration_step_refresh(inputs)
});