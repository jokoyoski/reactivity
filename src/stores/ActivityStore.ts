import { observable, action, computed } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../app/api/agent";
class ActivityStore {
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable activity: IActivity | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";
  @computed get activitiesBDate() {
    return this.activities.sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = () => {
    this.loadingInitial = true;
    agent.Activities.list()
      .then((activities) => {
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          this.activities.push(activity);
        });
      })
      .finally(() => (this.loadingInitial = false));
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      this.submitting = true;
      this.activities.push(activity);
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
    }
  };
  @action editActivity = async (activity: IActivity) => {
    try {
      this.submitting = true;
      await agent.Activities.update(activity);
      this.activities = this.activities.filter((a) => a.id !== activity.id);
      this.activities.push(activity);
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
    }
  };
  @action clearActivity = () => {
    this.activity = undefined;
  };
  @action loadActivty = (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
    } else {
      this.loadingInitial = true;
      try {
        agent.Activities.details(id).then((activity: IActivity) => {
          this.activity = activity;
        });
      } catch (error) {}
    }
  };
  getActivity = (id: string) => {
    return this.activities.find((x) => x.id == id);
  };

  @action openEditForm = (id: string) => {
    this.activity = this.activities.find((x) => x.id == id);
    this.editMode = true;
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.activity = undefined;
  };
  @action selectActivity = (id: string) => {
    this.activity = this.activities.find((a) => a.id == id);
    this.editMode = false;
  };

  @action cancelSelectActivity = () => {
    this.activity = undefined;
  };

  @action deleteActivity = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.activity = undefined;
    this.submitting = true;
    this.target = event.currentTarget.name;
    agent.Activities.delete(id)
      .then(() => {
        this.activities = this.activities.filter((a) => a.id !== id);
        this.submitting = false;
        this.target = "";
      })
      .catch((error) => {
        this.submitting = false;
        this.target = "";
      });
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
