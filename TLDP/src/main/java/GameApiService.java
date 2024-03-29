import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.*;


/**
 * Servlet implementation class GameApiService
 */
@WebServlet("/games")
public class GameApiService extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private int status;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GameApiService() {
    }

    /**
     * Handle GET API request.
     * 
     * @param request
     * @param response
     */
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        QueryParameters params = validateParameters(request, response);
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONObject result = new JSONObject();

        if (status == HttpServletResponse.SC_BAD_REQUEST) {

            result.put("status", "invalid request");
            result.put("code", status);
            result.put("data", new JSONArray());
            
            out.print(result.toString());
            response.setStatus(status);
            //may want to consider sending an error here instead
            return;
        }

        try {
            result = DatabaseManager.getGames(params);

            result.put("status", "success");
            result.put("code", status);
            response.setStatus(status);
            
            out.print(result.toString());
            return;
        } catch (Exception e) {
            //something wrong happened when performing get logic
            //this should never occur
            result.put("status", "internal error");
            result.put("code", HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            result.put("data", new JSONArray());

            out.print(result.toString());
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            //may want to consider sending an error here instead
            return;
        }
	}
	
	/**
     * Validate and sanitize the parameters in the API request to send to database manager.
     * 
     * @param request
     * @param response
     * @return
     */
    private QueryParameters validateParameters(HttpServletRequest request, HttpServletResponse response) {
        
        QueryParameters params = new QueryParameters();

        String resultSize = request.getParameter("result_size");

        if (resultSize != null) {
            try {
                int size = Integer.parseInt(resultSize);
                params.setResult_size(size);
            } catch (NumberFormatException e) {
                status = HttpServletResponse.SC_BAD_REQUEST;
                return null;
            }
        } else {
            status = HttpServletResponse.SC_BAD_REQUEST;
            return null;
        }

        String playTime = request.getParameter("playtime");

        if (playTime != null) {
            try {
                int time = Integer.parseInt(playTime);
                params.setPlaytime(time);
            } catch (NumberFormatException e) {
                status = HttpServletResponse.SC_BAD_REQUEST;
                return null;
            }
        } else {
            status = HttpServletResponse.SC_BAD_REQUEST;
            return null;
        }

        String playtimeLeniency = request.getParameter("playtime_leniency");

        if (playtimeLeniency != null) {
            try {
                int time = Integer.parseInt(playtimeLeniency);
                params.setPlaytimeLeniency(time);
            } catch (NumberFormatException e) {
                response.setHeader("Warning: PlayTime Leniency", "Was not numeric and was not included in filter.");
            }
        }

        String genres = request.getParameter("genres");

        if (genres != null) {
            ArrayList<String> genreList = new ArrayList<String>(Arrays.asList(genres.split("\\s*,\\s*")));
            params.setGenresList(genreList);
        }

        String platforms = request.getParameter("platforms");

        if (platforms != null) {
            ArrayList<String> platformList = new ArrayList<String>(Arrays.asList(platforms.split("\\s*,\\s*")));
            params.setPlatformList(platformList);
        }
        
        String age = request.getParameter("age");
        if (age != null) {
            params.setAge(age);
        }


        status = HttpServletResponse.SC_OK;
        return params;
    }

}
