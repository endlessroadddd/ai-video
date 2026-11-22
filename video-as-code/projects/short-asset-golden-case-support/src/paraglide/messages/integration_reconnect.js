/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ platform: NonNullable<unknown> }} Integration_ReconnectInputs */

const en_integration_reconnect = /** @type {(inputs: Integration_ReconnectInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Reconnect ${i?.platform}`)
};

const zh_integration_reconnect = /** @type {(inputs: Integration_ReconnectInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`重新连接 ${i?.platform}`)
};

/**
* | output |
* | --- |
* | "Reconnect {platform}" |
*
* @param {Integration_ReconnectInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_reconnect = /** @type {((inputs: Integration_ReconnectInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_ReconnectInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_reconnect(inputs)
	return zh_integration_reconnect(inputs)
});