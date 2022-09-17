import express from "express"

import cors from 'cors'

import { PrismaClient } from "@prisma/client"

import { convertHourStringToMinutes } from "./utils/convertHourStringToMinutes"
import { convertMinutesToHoursString } from "./utils/convertMinutesToHoursString"

const app = express()

const prisma = new PrismaClient({
  log: ['query']
})

app.use(express.json())

app.use(cors())

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })

  return response.json(games)
})

app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id
  const adData = request.body

  const newAd = await prisma.ad.create({
    data: {
      gameId: gameId,
      name: adData.name,
      yearsPlaying: adData.yearsPlaying,
      discord: adData.discord,
      weekDays: adData.weekDays.join(","),
      hoursStart: convertHourStringToMinutes(adData.hoursStart),
      hoursEnd: convertHourStringToMinutes(adData.hoursEnd),
      useVoiceChannel: adData.useVoiceChannel
    }
  })

  return response.status(201).json(newAd)
})

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hoursStart: true,
      hoursEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    }
  })

  return response.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hoursStart: convertMinutesToHoursString(ad.hoursStart),
      hoursEnd: convertMinutesToHoursString(ad.hoursEnd),
    }
  }))
})

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    }
  })

  return response.json({ discord: ad.discord })
})


app.listen(3333, () => {
  console.log('Server is running')
})