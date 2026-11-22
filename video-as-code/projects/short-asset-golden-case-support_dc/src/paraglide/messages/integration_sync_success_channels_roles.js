/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ channels: NonNullable<unknown>, roles: NonNullable<unknown> }} Integration_Sync_Success_Channels_RolesInputs */

const en_integration_sync_success_channels_roles = /** @type {(inputs: Integration_Sync_Success_Channels_RolesInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Manual sync completed: ${i?.channels} channel(s), ${i?.roles} role(s).`)
};

const zh_integration_sync_success_channels_roles = /** @type {(inputs: Integration_Sync_Success_Channels_RolesInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`手动同步成功：channels ${i?.channels} 条，roles ${i?.roles} 条。`)
};

/**
* | output |
* | --- |
* | "Manual sync completed: {channels} channel(s), {roles} role(s)." |
*
* @param {Integration_Sync_Success_Channels_RolesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_sync_success_channels_roles = /** @type {((inputs: Integration_Sync_Success_Channels_RolesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Sync_Success_Channels_RolesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_sync_success_channels_roles(inputs)
	return zh_integration_sync_success_channels_roles(inputs)
});