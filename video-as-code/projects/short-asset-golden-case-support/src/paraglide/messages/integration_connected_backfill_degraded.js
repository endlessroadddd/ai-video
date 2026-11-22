/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ platform: NonNullable<unknown> }} Integration_Connected_Backfill_DegradedInputs */

const en_integration_connected_backfill_degraded = /** @type {(inputs: Integration_Connected_Backfill_DegradedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.platform} connected, but initial backfill failed. You can retry with manual sync.`)
};

const zh_integration_connected_backfill_degraded = /** @type {(inputs: Integration_Connected_Backfill_DegradedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.platform} 已连接，但首次回填失败，可点击“手动同步”重试。`)
};

/**
* | output |
* | --- |
* | "{platform} connected, but initial backfill failed. You can retry with manual sync." |
*
* @param {Integration_Connected_Backfill_DegradedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_connected_backfill_degraded = /** @type {((inputs: Integration_Connected_Backfill_DegradedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Connected_Backfill_DegradedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_connected_backfill_degraded(inputs)
	return zh_integration_connected_backfill_degraded(inputs)
});