import React, { useEffect, useState, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../../../components/Logo";
import {
  fonts,
  horizontalMargin,
  secColor,
  secTextColor,
} from "../../../../constants";
import { AuthenticationContext } from "../../../services/profile/authentication.context";

export const LoginScreen = ({ navigation }) => {
  const { user, isLoading, error, onLogin } = useContext(AuthenticationContext);

  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <LinearGradient
            Button
            Linear
            Gradient
            colors={[secColor, "#ccc"]}
            style={styles.background}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <View style={styles.topHolder}>
              <Logo size={100} color={"#fff"} />
              <Text style={styles.logoText}> Our Choice</Text>
            </View>

            <View style={styles.middleHolder}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeUsername}
                  placeholder="Email"
                  value={username}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  secureTextEntry
                  style={styles.input}
                  onChangeText={onChangePassword}
                  value={password}
                  placeholder="Password"
                />
              </View>
              {true ? (
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => onLogin(username, password)}
                >
                  <Text style={styles.lButtonText}>Login</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.loginButton}>
                  <ActivityIndicator size="small" color="#fff" />
                </TouchableOpacity>
              )}
              <View style={styles.createAccountContainer}>
                <Text style={styles.dontHaveAAccount}>
                  Dont have a account?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("CreateAccount")}
                >
                  <Text style={styles.createOne}>Create One</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputContainer: {
    marginHorizontal: horizontalMargin,
    marginVertical: "2%",
    borderRadius: 50,
    paddingLeft: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignSelf: "stretch",
  },
  input: {
    height: 50,
  },
  createAccountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  createOne: {
    marginLeft: 5,
    fontSize: 16,
    fontFamily: fonts[700],
    color: secColor,
  },
  dontHaveAAccount: {
    color: secTextColor,
  },
  logoText: {
    marginTop: 10,
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  subText: {
    color: "#fff",
    fontWeight: "bold",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  topHolder: {
    alignItems: "center",
    justifyContent: "center",
  },
  middleHolder: {
    width: "100%",
    alignItems: "center",
  },
  buttonHolder: {
    alignItems: "center",
    width: "100%",
  },
  loginButton: {
    marginHorizontal: horizontalMargin,
    marginVertical: "2%",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    padding: 10,
    backgroundColor: secColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  signupButton: {
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    width: "75%",
    borderWidth: 2,
    borderColor: "#fff",
    padding: 10,
    margin: 5,
    borderRadius: 50,
  },
  lButtonText: {
    color: "#ccc",
    fontSize: 20,
    fontFamily: fonts[700],
  },
  sButtonText: {
    color: "#fff",
    fontSize: 20,
  },
});
