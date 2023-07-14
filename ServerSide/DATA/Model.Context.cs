﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DATA
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class hotelAppDBContextNew : DbContext
    {
        public hotelAppDBContextNew()
            : base("name=hotelAppDBContextNew")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Activity> Activities { get; set; }
        public virtual DbSet<Activity_hotel> Activity_hotel { get; set; }
        public virtual DbSet<Activity_nearBY> Activity_nearBY { get; set; }
        public virtual DbSet<Additional_Items_Room_Service> Additional_Items_Room_Service { get; set; }
        public virtual DbSet<Category_rating> Category_rating { get; set; }
        public virtual DbSet<Chat> Chats { get; set; }
        public virtual DbSet<ChatLine> ChatLines { get; set; }
        public virtual DbSet<CheckIn> CheckIns { get; set; }
        public virtual DbSet<Checkout> Checkouts { get; set; }
        public virtual DbSet<Custom_Request_Types> Custom_Request_Types { get; set; }
        public virtual DbSet<Department> Departments { get; set; }
        public virtual DbSet<Facility> Facilities { get; set; }
        public virtual DbSet<Fault_Request> Fault_Request { get; set; }
        public virtual DbSet<Free_Queue> Free_Queue { get; set; }
        public virtual DbSet<Guest> Guests { get; set; }
        public virtual DbSet<Health_Declaration> Health_Declaration { get; set; }
        public virtual DbSet<Hotel> Hotels { get; set; }
        public virtual DbSet<HouseHold_Cleaning_Request> HouseHold_Cleaning_Request { get; set; }
        public virtual DbSet<HouseHold_Custom_Request> HouseHold_Custom_Request { get; set; }
        public virtual DbSet<HouseHold_Request> HouseHold_Request { get; set; }
        public virtual DbSet<Language> Languages { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<Questionnaire> Questionnaires { get; set; }
        public virtual DbSet<Receipt> Receipts { get; set; }
        public virtual DbSet<Request> Requests { get; set; }
        public virtual DbSet<Request_In_Order> Request_In_Order { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Room> Rooms { get; set; }
        public virtual DbSet<Room_Service_Order> Room_Service_Order { get; set; }
        public virtual DbSet<Shift> Shifts { get; set; }
        public virtual DbSet<Spa_Order> Spa_Order { get; set; }
        public virtual DbSet<Spa_Order_Active> Spa_Order_Active { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
        public virtual DbSet<Therapist> Therapists { get; set; }
        public virtual DbSet<Therapist_IN_Therapy> Therapist_IN_Therapy { get; set; }
        public virtual DbSet<Therapy> Therapies { get; set; }
        public virtual DbSet<Therapy_Knowledge> Therapy_Knowledge { get; set; }
        public virtual DbSet<Therapy_Room> Therapy_Room { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<WorkingInShift> WorkingInShifts { get; set; }
        public virtual DbSet<Alcohol> Alcohols { get; set; }
        public virtual DbSet<Drink> Drinks { get; set; }
        public virtual DbSet<Food> Foods { get; set; }
        public virtual DbSet<Food_And_Drinks> Food_And_Drinks { get; set; }
        public virtual DbSet<Hot_Cold_Drinks> Hot_Cold_Drinks { get; set; }
        public virtual DbSet<ApiProvider> ApiProviders { get; set; }
        public virtual DbSet<ApiRequestCount> ApiRequestCounts { get; set; }
        public virtual DbSet<ApiRequestCountMonthly> ApiRequestCountMonthlies { get; set; }
        public virtual DbSet<ActivityMoreImage> ActivityMoreImages { get; set; }
        public virtual DbSet<Activity_Update> Activity_Update { get; set; }
        public virtual DbSet<Food_And_Drinks_Room_Service> Food_And_Drinks_Room_Service { get; set; }
        public virtual DbSet<Additional_Items> Additional_Items { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
    }
}
