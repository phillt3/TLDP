import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class DatabaseConfig {

    private static final String PROP_FILE_NAME = "config.properties";

    public static String getJDBCUrl() {
        Properties prop = new Properties();
        try (InputStream inputStream = DatabaseConfig.class.getClassLoader().getResourceAsStream(PROP_FILE_NAME)) {
            if (inputStream != null) {
                prop.load(inputStream);
                return prop.getProperty("jdbc.url");
            } else {
                throw new FileNotFoundException("Property file '" + PROP_FILE_NAME + "' not found in the classpath");
            }
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}