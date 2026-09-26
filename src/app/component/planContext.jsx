"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
} from "react";

const PlanContext = createContext(null);

const emptyData = [];

// Cached data
let planSnapshot = emptyData;
let savedSnapshot = emptyData;

let initialized = false;

// Load localStorage only once
function loadStorage() {
  if (initialized) {
    return;
  }

  initialized = true;

  if (typeof window !== "undefined") {
    try {
      const savedPlan = localStorage.getItem("fitlog-plan");
      const savedWorkouts = localStorage.getItem("fitlog-saved");

      if (savedPlan) {
        planSnapshot = JSON.parse(savedPlan);
      }

      if (savedWorkouts) {
        savedSnapshot = JSON.parse(savedWorkouts);
      }
    } catch (error) {
      console.log("Error loading Fitlog data:", error);

      planSnapshot = emptyData;
      savedSnapshot = emptyData;
    }
  }
}

// Plan snapshot
function getPlan() {
  loadStorage();
  return planSnapshot;
}

// Saved snapshot
function getSaved() {
  loadStorage();
  return savedSnapshot;
}

// Server snapshot
function getServerSnapshot() {
  return emptyData;
}

// Listeners
const listeners = new Set();

function subscribe(callback) {
  listeners.add(callback);

  return () => {
    listeners.delete(callback);
  };
}

// Notify React
function notifyUpdate() {
  listeners.forEach((callback) => callback());
}

// Provider
export const PlanProvider = ({ children }) => {
  const plan = useSyncExternalStore(
    subscribe,
    getPlan,
    getServerSnapshot
  );

  const saved = useSyncExternalStore(
    subscribe,
    getSaved,
    getServerSnapshot
  );

  // ADD TO TODAY'S PLAN
  const addToPlan = (workout) => {
    const currentPlan = getPlan();

    // Already exists
    if (currentPlan.some((item) => item.id === workout.id)) {
      return false;
    }

    // Maximum 5 workouts
    if (currentPlan.length >= 5) {
      return false;
    }

    // Add workout with done = false
    const newWorkout = {
      ...workout,
      done: false,
    };

    const newPlan = [...currentPlan, newWorkout];

    planSnapshot = newPlan;

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(newPlan)
    );

    notifyUpdate();

    return true;
  };

  // MARK WORKOUT AS DONE
  const markAsDone = (id) => {
    const currentPlan = getPlan();

    const newPlan = currentPlan.map((workout) => {
      if (workout.id === id) {
        return {
          ...workout,
          done: true,
        };
      }

      return workout;
    });

    planSnapshot = newPlan;

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(newPlan)
    );

    notifyUpdate();
  };

  // REMOVE FROM PLAN
  const removeFromPlan = (id) => {
    const currentPlan = getPlan();

    const newPlan = currentPlan.filter(
      (item) => item.id !== id
    );

    planSnapshot = newPlan;

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(newPlan)
    );

    notifyUpdate();
  };

  // SAVE FOR LATER
  const saveWorkout = (workout) => {
    const currentSaved = getSaved();
    if (currentSaved.some((item) => item.id === workout.id)) {
      return false;
    }

    const newSaved = [...currentSaved, workout];

    savedSnapshot = newSaved;

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(newSaved)
    );
    notifyUpdate();

    return true;
  };


  const removeFromSaved = (id) => {


    const currentSaved = getSaved();
    
    const newSaved = currentSaved.filter(
      (item) => item.id !== id
    );

    savedSnapshot = newSaved;

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(newSaved)
    );

    notifyUpdate();
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        markAsDone,
        removeFromPlan,
        saveWorkout,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};



export const usePlan = () => {
  return useContext(PlanContext);
};