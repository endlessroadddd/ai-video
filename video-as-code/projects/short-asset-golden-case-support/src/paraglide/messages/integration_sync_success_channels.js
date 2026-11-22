/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ channels: NonNullable<unknown> }} Integration_Sync_Success_ChannelsInputs */

const en_integration_sync_success_channels = /** @type {(inputs: Integration_Sync_Success_ChannelsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Manual sync completed: ${i?.channels} channel(s).`)
};

const zh_integration_sync_success_channels = /** @type {(inputs: Integration_Sync_Success_ChannelsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`手动同步成功：channels ${i?.channels} 条。`)
};

/**
* | output |
* | --- |
* | "Manual sync completed: {channels} channel(s)." |
*
* @param {Integration_Sync_Success_ChannelsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_sync_success_channels = /** @type {((inputs: Integration_Sync_Success_ChannelsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Sync_Success_ChannelsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_sync_success_channels(inputs)
	return zh_integration_sync_success_channels(inputs)
});