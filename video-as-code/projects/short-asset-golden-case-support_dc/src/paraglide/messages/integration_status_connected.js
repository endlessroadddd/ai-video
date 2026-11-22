/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Integration_Status_ConnectedInputs */

const en_integration_status_connected = /** @type {(inputs: Integration_Status_ConnectedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connected`)
};

const zh_integration_status_connected = /** @type {(inputs: Integration_Status_ConnectedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已连接`)
};

/**
* | output |
* | --- |
* | "Connected" |
*
* @param {Integration_Status_ConnectedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_status_connected = /** @type {((inputs?: Integration_Status_ConnectedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Status_ConnectedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_status_connected(inputs)
	return zh_integration_status_connected(inputs)
});