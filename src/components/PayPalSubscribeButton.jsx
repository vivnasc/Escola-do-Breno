import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

/**
 * PayPal subscription button for a specific plan.
 *
 * Setup required in PayPal Developer Dashboard:
 * 1. Create a REST API app → get Client ID
 * 2. Create subscription plans (Products → Subscriptions):
 *    - Plan "Flor" (family): 5.99 EUR/month
 *    - Plan "Floresta" (therapist): 14.99 EUR/month
 * 3. Copy the Plan IDs into your .env file
 *
 * Environment variables:
 * - VITE_PAYPAL_CLIENT_ID: PayPal REST App client ID
 * - VITE_PAYPAL_PLAN_FAMILY: Plan ID for Flor tier
 * - VITE_PAYPAL_PLAN_THERAPIST: Plan ID for Floresta tier
 *
 * Flow:
 * 1. User clicks PayPal button
 * 2. PayPal opens login/payment popup
 * 3. User approves subscription
 * 4. onApprove fires with subscriptionID
 * 5. We update the profile's subscriptionTier locally
 * 6. (Future) Webhook on Supabase Edge Function validates server-side
 */

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test'

const PLAN_IDS = {
  family: import.meta.env.VITE_PAYPAL_PLAN_FAMILY || '',
  therapist: import.meta.env.VITE_PAYPAL_PLAN_THERAPIST || '',
}

export default function PayPalSubscribeButton({ tierId, onSubscribed }) {
  const planId = PLAN_IDS[tierId]

  // If no client ID or plan ID configured, show placeholder
  if (!planId || PAYPAL_CLIENT_ID === 'test') {
    return (
      <div style={styles.placeholder}>
        <p style={styles.placeholderText}>
          Pagamentos PayPal em breve.
        </p>
        <p style={styles.placeholderHint}>
          Configuracao necessaria: VITE_PAYPAL_CLIENT_ID e VITE_PAYPAL_PLAN_{tierId.toUpperCase()}
        </p>
      </div>
    )
  }

  return (
    <PayPalScriptProvider
      options={{
        'client-id': PAYPAL_CLIENT_ID,
        vault: true,
        intent: 'subscription',
        currency: 'EUR',
      }}
    >
      <PayPalButtons
        style={{
          shape: 'rect',
          color: 'blue',
          layout: 'vertical',
          label: 'subscribe',
        }}
        createSubscription={(data, actions) => {
          return actions.subscription.create({
            plan_id: planId,
          })
        }}
        onApprove={(data) => {
          // data.subscriptionID contains the PayPal subscription ID
          onSubscribed?.({
            subscriptionId: data.subscriptionID,
            tierId,
            activatedAt: new Date().toISOString(),
          })
        }}
        onError={(err) => {
          console.error('PayPal subscription error:', err)
        }}
      />
    </PayPalScriptProvider>
  )
}

const styles = {
  placeholder: {
    padding: 'var(--space-md)',
    backgroundColor: '#F5F5F5',
    borderRadius: 'var(--radius-md)',
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
  },
  placeholderHint: {
    fontSize: '0.65rem',
    color: '#BDBDBD',
    marginTop: 'var(--space-xs)',
    fontFamily: 'monospace',
  },
}
