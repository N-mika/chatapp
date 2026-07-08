import { User } from "../Data/DataType"

export const validateStep = (step: number, from: User, confirmPassword: string) => {
  let errorMessage = ""

  if (step === 1) {
    if (!from.surName || !from.userName) {
      errorMessage = "Veuillez remplir votre nom et votre prénom."
      return { isValidStep: false, errorMessage }
    }
  }
  if (step === 2) {
    if (!from.email) {
      errorMessage = "Veuillez saisir votre adresse e-mail."
      return { isValidStep: false, errorMessage }
    }
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailValid.test(from.email) || !from.tel) {
      errorMessage = "Veuillez saisir une adresse e-mail et un numéro de téléphone valides."
      return { isValidStep: false, errorMessage }
    }
  }
  if (step === 3) {
    if (!from.password || !confirmPassword) {
      errorMessage = "Veuillez remplir les champs de mot de passe."
      return { isValidStep: false, errorMessage }
    }
    if (from.password.length < 6) {
      errorMessage = "Le mot de passe doit contenir au moins 6 caractères."
      return { isValidStep: false, errorMessage }
    }
    if (from.password !== confirmPassword) {
      errorMessage = "Les mots de passe ne correspondent pas."
      return { isValidStep: false, errorMessage }
    }
  }

  return { isValidStep: true, errorMessage }
}