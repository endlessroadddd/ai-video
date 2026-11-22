/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ platform: NonNullable<unknown> }} Integration_ConnectInputs */

const en_integration_connect = /** @type {(inputs: Integration_ConnectInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Connect ${i?.platform}`)
};

const zh_integration_connect = /** @type {(inputs: Integration_ConnectInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`连接 ${i?.platform}`)
};

/**
* | output |
* | --- |
* | "Connect {platform}" |
*
* @param {Integration_ConnectInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_connect = /** @type {((inputs: Integration_ConnectInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_ConnectInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_connect(inputs)
	return zh_integration_connect(inputs)
});