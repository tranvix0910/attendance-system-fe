import { useTheme, View, Text, Heading, Button } from '@aws-amplify/ui-react'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { MdLock } from 'react-icons/md'
import ptitLogo from '../assets/images/ptit-bg.png'

// CSS tùy chỉnh
const customStyles = `
  [data-amplify-authenticator] {
    --amplify-components-button-primary-background-color: #2563eb; /* indigo-600 */
    --amplify-components-button-primary-hover-background-color: #1d4ed8; /* indigo-700 */
    --amplify-components-button-primary-focus-background-color: #1d4ed8; /* indigo-700 */
    --amplify-components-fieldcontrol-focus-border-color: #2563eb; /* indigo-600 */
    --amplify-components-tabs-item-active-color: #1e293b; /* slate-800 */
    --amplify-components-tabs-item-active-border-color: #2563eb; /* indigo-600 */
    --amplify-components-button-link-color: #2563eb; /* indigo-600 */
    --amplify-components-button-link-hover-color: #1d4ed8; /* indigo-700 */

    --amplify-components-card-background-color: #ffffff;
    --amplify-components-card-border-radius: 14px;
    --amplify-components-card-box-shadow: 0 20px 40px -12px rgba(2, 6, 23, 0.2), 0 6px 18px -6px rgba(2, 6, 23, 0.12);

    --amplify-components-heading-color: #0f172a; /* slate-900 */
    --amplify-components-text-color: #334155; /* slate-700 */
    --amplify-components-field-label-color: #334155; /* slate-700 */

    max-width: 520px;
    margin: 0 auto;
    border-radius: 14px;
    background: linear-gradient(180deg, rgba(248, 250, 252, 0.9), rgba(255, 255, 255, 0.95));
    box-shadow: 0 20px 35px -15px rgba(15, 23, 42, 0.25);
    overflow: hidden;
    backdrop-filter: blur(8px);
    border: none;
    outline: none;
  }
  
  .amplify-button[data-variation='primary'] {
    border-radius: 10px;
    font-weight: 600;
    letter-spacing: 0.01em;
  }
  
  .amplify-input, .amplify-select {
    border-radius: 10px;
  }
  
  body {
    background: radial-gradient(1200px 600px at 0% 0%, #dbeafe 0%, transparent 50%),
                radial-gradient(1200px 600px at 100% 0%, #e0f2fe 0%, transparent 50%),
                linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  }
  
  .text-primary {
    color: #2563eb !important;
  }
  
  .text-primary-dark {
    color: #1d4ed8 !important;
  }
`

const components = {
    Header() {
        const { tokens } = useTheme()

        return (
            <View textAlign="center" padding={tokens.space.xl}>
                <div className="flex items-center justify-center">
                    <img src={ptitLogo} alt="PTIT Logo" style={{ width: '36px', height: '36px', borderRadius: '1px', objectFit: 'cover', marginRight: '8px' }} />
                    <span className="text-xl font-bold text-primary" style={{ color: '#2563eb' }}>
                        PTIT Attendance System
                    </span>
                </div>
            </View>
        )
    },

    Footer() {
        const { tokens } = useTheme()

        return (
            <View textAlign="center" padding={tokens.space.medium}>
                <Text color={tokens.colors.neutral[80]} style={{ fontSize: '0.875rem' }}>
                    &copy; {new Date().getFullYear()} Attendance System - All Rights Reserved
                </Text>
            </View>
        )
    },

    SignIn: {
        Header() {
            return (
                <div className="px-4 pb-4" style={{ padding: '0 1rem 1rem 1rem' }}>
                    <Heading
                        level={3}
                        style={{
                            marginBottom: '0.5rem',
                            textAlign: 'center',
                            fontWeight: '700',
                            color: '#0f172a'
                        }}
                    >
                        Welcome Back
                    </Heading>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: '0.9rem',
                            color: '#475569',
                            marginBottom: '1rem'
                        }}
                    >
                        Sign in to access your dashboard
                    </Text>
                </div>
            )
        },
        Footer() {
            const { toForgotPassword } = useAuthenticator()

            return (
                <View
                    textAlign="center"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        paddingTop: '0.5rem',
                        alignItems: 'center'
                    }}
                >
                    <Button
                        fontWeight="normal"
                        onClick={toForgotPassword}
                        size="small"
                        variation="link"
                        style={{ color: '#2563eb' }}
                    >
                        Forgot password?
                    </Button>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            color: '#64748b',
                            gap: '0.25rem'
                        }}
                    >
                        <MdLock style={{ color: '#94a3b8' }} />
                        <span>Secured with enterprise-grade encryption</span>
                    </div>
                </View>
            )
        }
    },
    SignUp: {
        Header() {
            return (
                <div style={{ padding: '0 1rem 1rem 1rem' }}>
                    <Heading
                        level={3}
                        style={{
                            marginBottom: '0.5rem',
                            textAlign: 'center',
                            fontWeight: '700',
                            color: '#0f172a'
                        }}
                    >
                        Create Account
                    </Heading>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: '0.9rem',
                            color: '#475569',
                            marginBottom: '1rem'
                        }}
                    >
                        Join Attendance System and enhance your security
                    </Text>
                </div>
            )
        },
        Footer() {
            const { toSignIn } = useAuthenticator()

            return (
                <View textAlign="center">
                    <Button
                        fontWeight="normal"
                        onClick={toSignIn}
                        size="small"
                        variation="link"
                        style={{ color: '#2563eb' }}
                    >
                        Already have an account? Sign in
                    </Button>
                </View>
            )
        }
    },
    ConfirmSignUp: {
        Header() {
            return (
                <div style={{ padding: '0 1rem 1rem 1rem' }}>
                    <Heading
                        level={3}
                        style={{
                            marginBottom: '0.5rem',
                            textAlign: 'center',
                            fontWeight: '700',
                            color: '#0f172a'
                        }}
                    >
                        Confirm Your Account
                    </Heading>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: '0.9rem',
                            color: '#475569',
                            marginBottom: '1rem'
                        }}
                    >
                        Enter the confirmation code sent to your email
                    </Text>
                </div>
            )
        },
        Footer() {
            return (
                <div
                    style={{
                        textAlign: 'center',
                        fontSize: '0.8rem',
                        color: '#64748b',
                        paddingTop: '0.5rem'
                    }}
                >
                    Check your inbox or spam folder for the confirmation code
                </div>
            )
        }
    },
    SetupTotp: {
        Header() {
            return (
                <div style={{ padding: '0 1rem 1rem 1rem' }}>
                    <Heading
                        level={3}
                        style={{
                            marginBottom: '0.5rem',
                            textAlign: 'center',
                            fontWeight: '700',
                            color: '#0f172a'
                        }}
                    >
                        Set Up MFA
                    </Heading>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: '0.9rem',
                            color: '#475569',
                            marginBottom: '1rem'
                        }}
                    >
                        Enhance your account security with multi-factor authentication
                    </Text>
                </div>
            )
        },
        Footer() {
            return (
                <div
                    style={{
                        textAlign: 'center',
                        fontSize: '0.8rem',
                        color: '#64748b',
                        paddingTop: '0.5rem'
                    }}
                >
                    Scan the QR code with an authenticator app like Google Authenticator or Authy
                </div>
            )
        }
    },
    ConfirmSignIn: {
        Header() {
            return (
                <div style={{ padding: '0 1rem 1rem 1rem' }}>
                    <Heading
                        level={3}
                        style={{
                            marginBottom: '0.5rem',
                            textAlign: 'center',
                            fontWeight: '700',
                            color: '#0f172a'
                        }}
                    >
                        Verify Your Identity
                    </Heading>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: '0.9rem',
                            color: '#475569',
                            marginBottom: '1rem'
                        }}
                    >
                        Enter the verification code to continue
                    </Text>
                </div>
            )
        },
        Footer() {
            return (
                <div
                    style={{
                        textAlign: 'center',
                        fontSize: '0.8rem',
                        color: '#64748b',
                        paddingTop: '0.5rem'
                    }}
                >
                    This additional step helps keep your account secure
                </div>
            )
        }
    },
    ForgotPassword: {
        Header() {
            return (
                <div style={{ padding: '0 1rem 1rem 1rem' }}>
                    <Heading
                        level={3}
                        style={{
                            marginBottom: '0.5rem',
                            textAlign: 'center',
                            fontWeight: '700',
                            color: '#0f172a'
                        }}
                    >
                        Reset Password
                    </Heading>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: '0.9rem',
                            color: '#475569',
                            marginBottom: '1rem'
                        }}
                    >
                        Enter your email to receive password reset instructions
                    </Text>
                </div>
            )
        },
        Footer() {
            return (
                <div
                    style={{
                        textAlign: 'center',
                        fontSize: '0.8rem',
                        color: '#64748b',
                        paddingTop: '0.5rem'
                    }}
                >
                    We&apos;ll send instructions to your registered email address
                </div>
            )
        }
    },
    ConfirmResetPassword: {
        Header() {
            return (
                <div style={{ padding: '0 1rem 1rem 1rem' }}>
                    <Heading
                        level={3}
                        style={{
                            marginBottom: '0.5rem',
                            textAlign: 'center',
                            fontWeight: '700',
                            color: '#0f172a'
                        }}
                    >
                        Create New Password
                    </Heading>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: '0.9rem',
                            color: '#475569',
                            marginBottom: '1rem'
                        }}
                    >
                        Enter the code and your new password
                    </Text>
                </div>
            )
        },
        Footer() {
            return (
                <div
                    style={{
                        textAlign: 'center',
                        fontSize: '0.8rem',
                        color: '#64748b',
                        paddingTop: '0.5rem'
                    }}
                >
                    Create a strong password with a mix of letters, numbers and symbols
                </div>
            )
        }
    },
    SelectMfaType: {
        Header() {
            return (
                <div style={{ padding: '0 1rem 1rem 1rem' }}>
                    <Heading
                        level={3}
                        style={{
                            marginBottom: '0.5rem',
                            textAlign: 'center',
                            fontWeight: '700',
                            color: '#0f172a'
                        }}
                    >
                        Choose MFA Method
                    </Heading>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: '0.9rem',
                            color: '#475569',
                            marginBottom: '1rem'
                        }}
                    >
                        Select your preferred multi-factor authentication method
                    </Text>
                </div>
            )
        },
        Footer() {
            return (
                <div
                    style={{
                        textAlign: 'center',
                        fontSize: '0.8rem',
                        color: '#64748b',
                        paddingTop: '0.5rem'
                    }}
                >
                    Adding MFA significantly enhances your account security
                </div>
            )
        }
    },
    SetupEmail: {
        Header() {
            return (
                <div style={{ padding: '0 1rem 1rem 1rem' }}>
                    <Heading
                        level={3}
                        style={{
                            marginBottom: '0.5rem',
                            textAlign: 'center',
                            fontWeight: '700',
                            color: '#0f172a'
                        }}
                    >
                        Email MFA Setup
                    </Heading>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: '0.9rem',
                            color: '#475569',
                            marginBottom: '1rem'
                        }}
                    >
                        Verification codes will be sent to your email
                    </Text>
                </div>
            )
        },
        Footer() {
            return (
                <div
                    style={{
                        textAlign: 'center',
                        fontSize: '0.8rem',
                        color: '#64748b',
                        paddingTop: '0.5rem'
                    }}
                >
                    Make sure you have access to your email before proceeding
                </div>
            )
        }
    }
}

export { components, customStyles }