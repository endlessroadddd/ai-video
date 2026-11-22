/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Billing_Blocked_ActionsInputs */

const en_billing_blocked_actions = /** @type {(inputs: Billing_Blocked_ActionsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} action(s) have been blocked by the quota policy.`)
};

const zh_billing_blocked_actions = /** @type {(inputs: Billing_Blocked_ActionsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已有 ${i?.count} 次因额度策略被拦截`)
};

/**
* | output |
* | --- |
* | "{count} action(s) have been blocked by the quota policy." |
*
* @param {Billing_Blocked_ActionsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_blocked_actions = /** @type {((inputs: Billing_Blocked_ActionsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Blocked_ActionsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_blocked_actions(inputs)
	return zh_billing_blocked_actions(inputs)
});