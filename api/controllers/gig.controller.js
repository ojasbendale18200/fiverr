import Gig from "../models/gig.model.js";


// Add GIG
export const createGig = async (req, res) => {
  if (!req.isSeller)
    return res.status(403).send("Only sellers can create a gig!");

  const payload = { userId: req.userId, ...req.body };
  const newGig = new Gig(payload);

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    res.status(400).send(err);
  }
};

// DELETE Gig
export const deleteGig = async (req, res) => {
  const {id} = req.params
    try {
      const gig = await Gig.findById(id);
      if (gig.userId !== req.userId)
        return res.staus(403).send( "You can delete only your gig!");
  
      await Gig.findByIdAndDelete(id);
      res.status(200).send("Gig has been deleted!");
    } catch (err) {
      res.status(400).send(err)
    }
  };


// GET Single Gig
  export const getGig = async (req, res) => {
    const {id} = req.params
    try {
      const gig = await Gig.findById(id);
      if (!gig) return res.status(404).send( "Gig not found!");
      res.status(200).send(gig);
    } catch (err) {
        res.status(400).send(err)
    }
  };

// GET All gig

export const getGigs = async (req, res) => {
    const q = req.query;
    const filters = {
      ...(q.userId && { userId: q.userId }),
      ...(q.cat && { cat: q.cat }),
      ...((q.min || q.max) && {
        price: {
          ...(q.min && { $gt: q.min }),
          ...(q.max && { $lt: q.max }),
        },
      }),
      ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    };
    try {
      const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
      res.status(200).send(gigs);
    } catch (err) {
        res.status(400).send(err)
    }
  };

