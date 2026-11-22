/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ platform: NonNullable<unknown> }} Integration_Step_ConnectInputs */

const en_integration_step_connect = /** @type {(inputs: Integration_Step_ConnectInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`1. Connect ${i?.platform}`)
};

const zh_integration_step_connect = /** @type {(inputs: Integration_Step_ConnectInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`1. 连接 ${i?.platform}`)
};

/**
* | output |
* | --- |
* | "1. Connect {platform}" |
*
* @param {Integration_Step_ConnectInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_step_connect = /** @type {((inputs: Integration_Step_ConnectInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Step_ConnectInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_step_connect(inputs)
	return zh_integration_step_connect(inputs)
});