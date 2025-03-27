import mongoose from 'mongoose';
import express from 'express';
import jwt from 'jsonwebtoken'

import { TaskModel } from '../models/TaskModel.js';
import { UserModel } from '../models/UserModel.js';


const router = express.Router()


router.post("/add-task", async (req, res) => {
  let task = req.body;


  const personId = await jwt.verify(task.person, process.env.SECRET_KEY)
  task.person = personId.id


  try {
    const Task = new TaskModel(task)
    await Task.save()

    const isUser = await UserModel.findById(task.person)

    if (!isUser) {
      res.status(500).json("User Not Found")
    }

    if (isUser) {
      isUser.tasks.push(Task)
      res.status(200).json("Task Added Successfully")
      await isUser.save()
    }



  } catch (error) {
    res.status(500).json(error.message)
  }


});



router.post("/task-data", async (req, res) => {

  const { title, priority, from, userId } = req.body


  const filter = {};


  if (title) {
    filter.$or = [
      { title: { $regex: title, $options: 'i' } },
    ];
  }


  if (priority) {
    filter.priority = priority;
  }


  if (from) {
    let newDate = new Date(from)


    filter.createdAt = { $gte: from, $lte: newDate.setUTCHours(23, 59, 59, 999) };
  }



  try {

    const personId = await jwt.verify(userId, process.env.SECRET_KEY)
    const isUser = await TaskModel.find({ person: personId.id })

    if (isUser) {
      filter.person = personId.id
      const response = await TaskModel.find(filter)
      res.status(200).json(response)
    }



  } catch (error) {

    res.status(500).json(error.message)

  }


})


router.post("/remove-task", async (req, res) => {

  const { userId, taskId } = req.body

  try {

    const personId = await jwt.verify(userId, process.env.SECRET_KEY)
    const isUser = await UserModel.findById(personId.id)

    if (isUser) {
      const response = await TaskModel.findByIdAndDelete(taskId)

      res.status(200).json("Task Removed ")
    }



  } catch (error) {
    res.status(500).json(error.message)
  }


})


router.post("/update-task", async (req, res) => {

  const { userId, taskId, title, description, priority, status, team, assignee } = req.body;

  try {
    const personId = await jwt.verify(userId, process.env.SECRET_KEY);
    const isUser = await UserModel.findById(personId.id);


    console.log(req.body)

    if (!isUser) {
      return res.status(404).json("User not found");
    }

    const isValid = await TaskModel.findById(taskId);

    if (isValid) {
      const updateData = {};

      if (title !== undefined) updateData.title = title;
      if (description !== undefined) updateData.description = description;
      if (priority !== undefined) updateData.priority = priority;
      if (status !== undefined) updateData.status = status;
      if (team !== undefined) updateData.team = team;
      if (assignee !== undefined) updateData.assignee = assignee;

      await TaskModel.findByIdAndUpdate(taskId, updateData);
      res.status(200).json("Task Updated Successfully");
    } else {
      res.status(404).json("Task not found");
    }

  } catch (error) {
    res.status(500).json(error.message);
  }

});


router.post("/awake", async (req, res) => {

  try {

    const response = await TaskModel.findOne({title: "sdasdfasdfasdfsa"})
    
    res.json(response)
    console.log(response)

  } catch (error) {

    console.log(error.message)

  }

})





export { router as TaskData }