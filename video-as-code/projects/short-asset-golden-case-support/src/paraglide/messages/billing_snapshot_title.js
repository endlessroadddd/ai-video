/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Snapshot_TitleInputs */

const en_billing_snapshot_title = /** @type {(inputs: Billing_Snapshot_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current period snapshot`)
};

const zh_billing_snapshot_title = /** @type {(inputs: Billing_Snapshot_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账期快照`)
};

/**
* | output |
* | --- |
* | "Current period snapshot" |
*
* @param {Billing_Snapshot_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_snapshot_title = /** @type {((inputs?: Billing_Snapshot_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Snapshot_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_snapshot_title(inputs)
	return zh_billing_snapshot_title(inputs)
});