/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Session_Unknown_ChannelInputs */

const en_session_unknown_channel = /** @type {(inputs: Session_Unknown_ChannelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unknown channel`)
};

const zh_session_unknown_channel = /** @type {(inputs: Session_Unknown_ChannelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未知频道`)
};

/**
* | output |
* | --- |
* | "Unknown channel" |
*
* @param {Session_Unknown_ChannelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const session_unknown_channel = /** @type {((inputs?: Session_Unknown_ChannelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Session_Unknown_ChannelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_session_unknown_channel(inputs)
	return zh_session_unknown_channel(inputs)
});