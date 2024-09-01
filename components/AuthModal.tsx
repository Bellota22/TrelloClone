import { AuthStrategy, ModalType } from '@/types/enums';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const LOGIN_OPTIONS = [
    {
      text: 'Continue with Google',
      icon: require('@/assets/images/login/google.png'),
      strategy: AuthStrategy.Google,
    },
    {
      text: 'Continue with Microsoft',
      icon: require('@/assets/images/login/microsoft.png'),
      strategy: AuthStrategy.Microsoft,
    },
    {
      text: 'Continue with Apple',
      icon: require('@/assets/images/login/apple.png'),
      strategy: AuthStrategy.Apple,
    },
    {
      text: 'Continue with Slack',
      icon: require('@/assets/images/login/slack.png'),
      strategy: AuthStrategy.Slack,
    },
  ];
interface AuthModalProps {
    authType: ModalType | null;
}

const AuthModal = ({authType}: AuthModalProps) => {
    const onSelectedAuth = (strategy: AuthStrategy) => {
        console.log(strategy);
    }
    return (
        <BottomSheetView style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalBtn}>
                <Ionicons name="mail-outline" size={20} color="black"/>
                <Text style={styles.btnText}>
                    {authType === ModalType.Login ? 'Continue with Email' : 'Sign up with Email'}
                </Text>
            </TouchableOpacity>
            {
                LOGIN_OPTIONS.map((option) => (
                    <TouchableOpacity
                        key={option.strategy}
                        style={styles.modalBtn}
                        onPress={() => onSelectedAuth(option.strategy)}>
                        <Image source={option.icon} style={styles.btnItem} />
                        <Text style={styles.btnText}>{option.text}</Text>
                    </TouchableOpacity>
                ))
            }
        </BottomSheetView>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 20,
        gap: 20,
    },
    modalBtn: {
        flexDirection: 'row',
        gap: 14,
        alignItems: 'center',
    },
    btnText: {
        fontSize: 18,
        lineHeight: 24,
    },
    btnItem: {
        width: 20,
        height: 20,
    }

})

export default AuthModal;