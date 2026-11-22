/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ platform: NonNullable<unknown> }} Integration_Connected_Backfill_SuccessInputs */

const en_integration_connected_backfill_success = /** @type {(inputs: Integration_Connected_Backfill_SuccessInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.platform} connected and initial backfill completed.`)
};

const zh_integration_connected_backfill_success = /** @type {(inputs: Integration_Connected_Backfill_SuccessInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.platform} 已连接并完成首次回填。`)
};

/**
* | output |
* | --- |
* | "{platform} connected and initial backfill completed." |
*
* @param {Integration_Connected_Backfill_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_connected_backfill_success = /** @type {((inputs: Integration_Connected_Backfill_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Connected_Backfill_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_connected_backfill_success(inputs)
	return zh_integration_connected_backfill_success(inputs)
});