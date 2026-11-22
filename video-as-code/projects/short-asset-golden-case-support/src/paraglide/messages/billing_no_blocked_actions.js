/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_No_Blocked_ActionsInputs */

const en_billing_no_blocked_actions = /** @type {(inputs: Billing_No_Blocked_ActionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No actions are currently blocked by stop-service.`)
};

const zh_billing_no_blocked_actions = /** @type {(inputs: Billing_No_Blocked_ActionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前没有被 stop-service 拦截的动作`)
};

/**
* | output |
* | --- |
* | "No actions are currently blocked by stop-service." |
*
* @param {Billing_No_Blocked_ActionsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_no_blocked_actions = /** @type {((inputs?: Billing_No_Blocked_ActionsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_No_Blocked_ActionsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_no_blocked_actions(inputs)
	return zh_billing_no_blocked_actions(inputs)
});