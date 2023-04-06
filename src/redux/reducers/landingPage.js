import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  main_email: "",
  social_links: {
    linked_in: "",
    twitter: "",
    instagram: "",
    facebook: ""
  },
  main_logo_a: "",
  main_logo_b: "",
  titleLine: "",
  countryList: [],
  total_students: 0,
  scholarships: 0,
  totalCourses: 0,
  footerDescription: "",
  baseUrl: "",
  top_courses: [],
  schoolsLogo: [],
  topSchools: [],
  media: {
    text: "",
    image: ""
  },
  about: {
    text: "",
    image: ""
  },

}


export const landingPageSlice = createSlice({
  name: 'landingPage',
  initialState,
  reducers: {
    setData: (state, action) => {
      console.log({ action, state: state.main_email })
      state.main_email = action.payload.main_email;
      state.social_links = action.payload.social_links;
      state.main_logo_a = action.payload.main_logo_a;
      state.main_logo_b = action.payload.main_logo_b;
      state.titleLine = action.payload.titleLine;
      state.countryList = action.payload.countries;
      state.total_students = action.payload.total_students;
      state.scholarships = action.payload.scholarships;
      state.totalCourses = action.payload.total_courses;
      state.footerDescription = action.payload.footer_description;
      state.baseUrl = action.payload.baseUrl;
      state.top_courses = action.payload.top_courses;
      state.schoolsLogo = action.payload.schoolsLogo;
      state.topSchools = action.payload.topSchools;
      state.media = action.payload.media;
      state.about = action.payload.about;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setData } = landingPageSlice.actions

export default landingPageSlice.reducer


