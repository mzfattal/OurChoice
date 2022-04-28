import React, { useEffect, createContext, useState } from "react";
import { auth } from "../../../firebase";

export const loginRequest = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const createAccountRequest = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);
