import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { PredictionPieChart, AnalyticsByAge, AnalyticsByEthnicity } from '../analytics-pie-charts';
import { AnalyticsWebsiteVisits } from '../analytics-bar-charts';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid xs={12} md={6} lg={4}>
          <PredictionPieChart
            title="Predictions based on the latest polls"
            subheader="Based on the latest polls"
            chart={{
              series: [
                { label: 'Anura Kumara', value: 38.16 },
                { label: 'Sajith Premadasa', value: 30.51 },
                { label: 'Namal Rajapakse', value: 3.55 },
                { label: 'Ranil Wikramasinge', value: 27.71 },
              ],
            }}
          />
        </Grid>

        <Grid container xs={12} spacing={3}>
          <Grid xs={12} md={6} lg={4}>
            <AnalyticsByAge
              title="Population by Age group"
              chart={{
                series: [
                  { label: '0 - 14', value: 12.4 },
                  { label: '15 - 59', value: 25.2 },
                  { label: 'Above 60', value: 62.4 },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <AnalyticsWebsiteVisits
              title="Voting Intention by Demographic Characteristics"
              chart={{
                categories: ['18 - 29', '30 - 59', '60'],
                series: [
                  { name: 'SLPP', data: [2, 5, 4] },
                  { name: 'Sajith Premadasa', data: [30, 31, 36] },
                  { name: 'Anura Kumara', data: [53, 36, 14] },
                  { name: 'Ranil Wikramasinge', data: [16, 29, 43] },
                ],
              }}
            />
          </Grid>
        </Grid>       
        <Grid container xs={12} spacing={3}>
          <Grid xs={12} md={6} lg={4}>
            <AnalyticsByEthnicity
              title="Population by Ethnicity"
              chart={{
                series: [
                  { label: 'Sinhalese', value: 74.9 },
                  { label: 'Sri Lnkan Tamil', value: 11.2 },
                  { label: 'Indian Tamil', value: 4.1 },
                  { label: 'Muslim', value: 9.3 },
                  // { label: 'Others', value: 0.5 },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <AnalyticsWebsiteVisits
              title="Voting Intention by Ethnicity"
              chart={{
                categories: ['Sinhala', 'Sri Lankan Tamil', 'Indian Tamil', 'Muslim'],
                series: [
                  { name: 'SLPP', data: [4, 1, 1, 2] },
                  { name: 'Sajith Premadasa', data: [22, 55, 53, 71] },
                  { name: 'Anura Kumara', data: [42, 21, 23, 11] },
                  { name: 'Ranil Wikramasinge', data: [31, 22, 23, 16] },
                ],
              }}
            />
          </Grid>
        </Grid> 
        
        <Grid container xs={12} spacing={3}>
          <Grid xs={12} md={6} lg={4}>
            <AnalyticsByEthnicity
              title="Population by Province"
              chart={{
                series: [
                  { label: 'Western', value: 28.07 },
                  { label: 'Central', value: 12.69 },
                  { label: 'Southern', value: 12.17 },
                  { label: 'North Western', value: 11.07 },
                  { label: 'Sabaragamuwa', value: 9.42 },
                  { label: 'Other', value: 25.95 },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <AnalyticsWebsiteVisits
              title="Voting Intention by Province"
              chart={{
                categories: [''],
                series: [
                  { name: 'SLPP', data: [4, 2, 3, 1, 7, ] },
                  { name: 'Sajith Premadasa', data: [25, 35, 18, 32, 26, ] },
                  { name: 'Anura Kumara', data: [37, 41, 52, 30, 41, ] },
                  { name: 'Ranil Wikramasinge', data: [34, 22, 27, 36, 26, 98] },
                ],
              }}
            />
          </Grid>
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title="Website visits"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              series: [
                { name: 'Team A', data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
                { name: 'Team B', data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
              ],
            }}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AnalyticsConversionRates
            title="Conversion rates"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Italy', 'Japan', 'China', 'Canada', 'France'],
              series: [
                { name: '2022', data: [44, 55, 41, 64, 22] },
                { name: '2023', data: [53, 32, 33, 52, 13] },
              ],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentSubject
            title="Current subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={8}>
          <AnalyticsNews title="News" list={_posts.slice(0, 5)} />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="Order timeline" list={_timeline} />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AnalyticsTrafficBySite
            title="Traffic by site"
            list={[
              { value: 'facebook', label: 'Facebook', total: 323234 },
              { value: 'google', label: 'Google', total: 341212 },
              { value: 'linkedin', label: 'Linkedin', total: 411213 },
              { value: 'twitter', label: 'Twitter', total: 443232 },
            ]}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={8}>
          <AnalyticsTasks title="Tasks" list={_tasks} />
        </Grid> */}
      </Grid>
    </DashboardContent>
  );
}
