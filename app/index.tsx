import { Colors } from "@/constants/Colors";
import { ModalType } from "@/types/enums";
import React, { useCallback, useMemo, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as WebBrowser from 'expo-web-browser';
import { useActionSheet } from "@expo/react-native-action-sheet";
import { 
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop
 } from "@gorhom/bottom-sheet";
import AuthModal from "@/components/AuthModal";


export default function Index() {
  const { top } = useSafeAreaInsets();
  const { showActionSheetWithOptions } = useActionSheet();
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['33%'], []);
  const [authType, setAuthType] = useState<ModalType | null>(null);


  const openLink = async () => {
    WebBrowser.openBrowserAsync('https://galaxies.dev');
  }

  const openActionSheet = async () => {
    const options = ['View support docs', 'Contact support', 'Cancel'];
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: 'Need help?',
      },
      (selectedIndex: any) => {
        console.log(selectedIndex);
      }
    )
  }
  
  const showModal = async (type: ModalType) => {
    setAuthType(type);
    bottomSheetModalRef.current?.present();
  }

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        opacity={0.3}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        enableTouchThrough={true}
        {...props}
        onPress={() => bottomSheetModalRef.current?.close()}
        />
    ),
    []
  )

  return (
    <BottomSheetModalProvider>
      <View
        style={[
          styles.container,
          {
            paddingTop: top + 30,
          },
        ]}
      >
        <Image source={require('@/assets/images/login/trello.png')} style={styles.image} />
        <Text style={styles.introText}>Buena bro</Text>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={[styles.btn, { backgroundColor: "#fff"}]}
            onPress={() => showModal(ModalType.Login)}
          >
            <Text style={[styles.btnText,{ color: Colors.primary }]}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}
            onPress={() => showModal(ModalType.SignUp)}
          >
            <Text style={[styles.btnText,{ color: "#fff" }]}>Sign in</Text>
          </TouchableOpacity>

          <Text style={styles.description}>
            By signing up, you agree to the {' '}<Text onPress={openLink} style={styles.link}>User notice</Text>{' '}and{' '}
            <Text onPress={openLink} style={styles.link}>Privacy Policy</Text>
          </Text>

          <Text style={styles.link}>
            Can't log in? {' '}<Text onPress={openActionSheet} style={styles.link}>Get help</Text>
          </Text>
        </View>
      </View>
      <BottomSheetModal
        index={0}
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
        handleComponent={null}
        enableOverDrag={false}
        enablePanDownToClose={true}
      >
        <AuthModal authType={authType} />
      </BottomSheetModal>
  </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  image: {
    height: 450,
    paddingHorizontal: 40,
    resizeMode: "contain",
  },
  introText: {
    fontWeight: '600',
    color: 'white',
    fontSize: 17,
    padding: 30,
  },
  bottomContainer: {
    gap: 10,
    width: '100%',
    paddingHorizontal: 40,
  },
  btn: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
  btnText: {
    fontSize: 16,
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    marginHorizontal: 60,
  },
  link: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    textDecorationLine: 'underline',
  }
});
