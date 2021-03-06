'use strict';

const express = require(`express`);
const {HttpCode} = require(`../../constants`);
const {asyncWrapper} = require(`../../utils`);

module.exports = (app, service) => {
  const route = new express.Router();

  route.get(`/`, asyncWrapper(async (req, res) => {

    const {query = ``} = req.query;

    if (!query) {
      res.status(HttpCode.BAD_REQUEST).json([]);
      return;
    }

    const searchResults = await service.findAll(query);
    const searchStatus = searchResults.length > 0 ? HttpCode.OK : HttpCode.NOT_FOUND;

    res.status(searchStatus)
      .json(searchResults);
  }));

  app.use(`/search`, route);
};
