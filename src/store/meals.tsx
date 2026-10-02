import { createContext, useContext, useState, type ReactNode } from 'react'

import { dummyMeals } from '../data/meals'
import type { Meal } from '../types/meal'

export type NewMeal = Omit<Meal, 'id'>

type MealsContextValue = {
  meals: Meal[]
  addMeal: (input: NewMeal) => Meal
}

const MealsContext = createContext<MealsContextValue | null>(null)

// 料理データを全画面で共有するための入れ物。
// いまはメモリに持っているだけなので、アプリを再読み込みすると記録は消える。
// DB / API をつなぐときは、ここの中身だけ差し替えれば画面側は変えなくて済む。
export function MealsProvider({ children }: { children: ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>(dummyMeals)

  const addMeal = (input: NewMeal) => {
    const meal = { ...input, id: String(Date.now()) }
    setMeals((prev) => [meal, ...prev])
    return meal
  }

  return <MealsContext.Provider value={{ meals, addMeal }}>{children}</MealsContext.Provider>
}

export function useMeals() {
  const value = useContext(MealsContext)
  if (!value) throw new Error('useMeals は MealsProvider の中で使ってください')
  return value
}
