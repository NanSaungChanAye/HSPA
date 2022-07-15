using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Interfaces;
using WebAPI.Models;
//using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly DataContext dc;
        private readonly ICityRepository repo;
        public CityController(DataContext dc, ICityRepository repo)
        {
            this.repo = repo;
            this.dc = dc;
        }
        //GET api/city
        [HttpGet]
        public async Task<IActionResult> GetCities()
        //public IEnumerable<string> Getstrings()
        {
            //return new string[] { "Atlanta", "New York", "Chicago", "Bosto" };
            //var cites = await dc.Cities.ToListAsync(); When use Repository Pattern
            var cites = await repo.GetCitiesAsync();
            return Ok(cites);
        }

        //Post api/city/add?cityname=Miami
        [HttpPost("add")]
        //Post api/city/add/Los Angeles
        [HttpPost("add/{cityname}")]
        
        public async Task<IActionResult> AddCity(string cityName)
        {
            City city = new City();
            city.Name = cityName;
            await dc.Cities.AddAsync(city);
            await dc.SaveChangesAsync();
            return Ok(city);
        }
        
        //Post api/city/post --Post the data in JSON format
        [HttpPost("post")]
        /*public async Task<IActionResult> AddCity(City city)
        {
            await dc.Cities.AddAsync(city);
            await dc.SaveChangesAsync();
            return Ok(city);
        }*/
        public async Task<IActionResult> AddCity(City city)
        {
            repo.AddCity(city);
            await repo.SaveAsync();
            return StatusCode(201);
        }



        [HttpDelete("delete/{id}")]
        /*public async Task<IActionResult> DeleteCity(int id)
        {
            var city = await dc.Cities.FindAsync(id);
            dc.Cities.Remove(city);
            await dc.SaveChangesAsync();
            return Ok(id);

        }*/
        public async Task<IActionResult> DeleteCity(int id)
        {
            repo.DeleteCity(id);
            await repo.SaveAsync();
            return Ok(id);

        }

    }
}