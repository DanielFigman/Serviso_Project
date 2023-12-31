﻿using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class ActivityNearByDTO
    {
        private readonly HelperFunctions dataHelper = new HelperFunctions();
        private hotelAppDBContextNew db = new hotelAppDBContextNew();
        public int placeID { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public double rating { get; set; }
        public string imageURL { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string category { get; set; }
        public string tags { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public long? fbid { get; set; }
        public string fUrl { get; set; }
        public string instaUsername { get; set; }
        public string webAddress { get; set; }

        public int? tripAdvisorLocationId { get; set; }

        public List<ActivityMoreImagesDTO> morePhotosUrls { get; set; }

        public void SetActivityNearByDTO(Activity_nearBY activityNearBy)
        {
            Activity activity = activityNearBy.Activity;

            placeID = activity.placeID;
            name = activity.name;
            description = activity.description;
            rating = activity.rating;
            imageURL = activity.imageURL;
            phone = activityNearBy.phone;
            address = activityNearBy.address;
            category = activityNearBy.category;
            latitude = dataHelper.GetLatitude(activityNearBy.landmark);
            longitude = dataHelper.GetLongitude(activityNearBy.landmark);
            fbid = activityNearBy.fbid;
            fUrl = activityNearBy.fUrl;
            instaUsername = activityNearBy.instaUsername;
            webAddress = activityNearBy.webAddress;
            tripAdvisorLocationId = activityNearBy.tripAdvisorLocationId;
            morePhotosUrls = GetImagesDTO();
        }

        public Dictionary<string, string> GetActivityNearByToTranslate()
        {
            Dictionary<string, string> retVal = new Dictionary<string, string>();
            retVal["name"] = name;
            retVal["description"] = description;
            retVal["address"] = address;
            retVal["tags"] = tags;

            return retVal;
        }

        private List<ActivityMoreImagesDTO> GetImagesDTO()
        {
            List<ActivityMoreImage> images = db.ActivityMoreImages.Where(x => x.placeID == placeID).ToList();
            List<ActivityMoreImagesDTO> retVal = new List<ActivityMoreImagesDTO>();

            images.ForEach(obj =>
            {
                ActivityMoreImagesDTO tempImage = new ActivityMoreImagesDTO();
                tempImage.SetActivityMoreImagesDTO(obj);
                retVal.Add(tempImage);
            });

            return retVal;
        }

        public void AddLocationIdToActicity(int? locationId, hotelAppDBContextNew db)
        {
            if (locationId != null)
            {
                tripAdvisorLocationId = locationId;

                Activity_nearBY thisActivity = db.Activity_nearBY.FirstOrDefault(obj => obj.placeID == placeID);

                thisActivity.tripAdvisorLocationId = locationId;
                thisActivity.isNotFoundLocationId = false;

                db.Activity_nearBY.AddOrUpdate(thisActivity);
                db.SaveChanges();
            }
            else
            {
                SetIsNotFoundLocationId(db);
            }
        }

        public void AddMoreImagesToActivity(List<string> moreImages, hotelAppDBContextNew db)
        {
            if (moreImages != null && moreImages.Count > 0)
            {
                List<ActivityMoreImagesDTO> moreImagesDTOs = new List<ActivityMoreImagesDTO>();

                moreImages.ForEach(url =>
                {
                    ActivityMoreImage activityMoreImage = new ActivityMoreImage();
                    activityMoreImage.SetActivityMoreImage(url, placeID);
                   
                    db.ActivityMoreImages.AddOrUpdate(activityMoreImage);
                    db.SaveChanges();

                    ActivityMoreImagesDTO activityMoreImagesDTO = new ActivityMoreImagesDTO();
                    activityMoreImagesDTO.SetActivityMoreImagesDTO(activityMoreImage);
                    moreImagesDTOs.Add(activityMoreImagesDTO);
                });

                morePhotosUrls = moreImagesDTOs;
            }
        }

        public bool IsNotFoundLocationId(hotelAppDBContextNew db)
        {
            Activity_nearBY activity = db.Activity_nearBY.FirstOrDefault(obj => obj.placeID == placeID);

            bool isNotFoundLocationId = activity != null && activity.isNotFoundLocationId != null && activity.isNotFoundLocationId == true;

            return isNotFoundLocationId;
        }

        private void SetIsNotFoundLocationId(hotelAppDBContextNew db)
        {
            Activity_nearBY thisActivity = db.Activity_nearBY.FirstOrDefault(obj => obj.placeID == placeID);

            thisActivity.isNotFoundLocationId = true;

            db.Activity_nearBY.AddOrUpdate(thisActivity);
            db.SaveChanges();
        }
    }
}
