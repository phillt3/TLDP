<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="org.json.JSONObject" %>
<%@ page import="java.io.BufferedReader" %>
<%@ page import="java.io.InputStreamReader" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>TL;DP</title>
<link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
<div class="page-title">Too Long ; Didn't Play</div>
<form id="myForm" onsubmit="makeRequest('${pageContext.request.contextPath}'); return false;">
    <label for="size">Result Size:</label>
    <input type="number" id="size" name="size" required min="1" max="100"><br>

    <label for="time">Play Time(Hours):</label>
    <input type="number" id="time" name="time" required min="1"><br>
        
    <label for="leniency">Play Time Leniency(Hours):</label>
    <input type="number" id="leniency" name="leniency"><br>
    
    <label for="genres">Select Genres:</label>
    <select id="genres" name="genres[]" multiple>
        <option value="action">Action</option>
        <option value="adventure">Adventure</option>
        <option value="rpg">RPG</option>
        <option value="fighting">Fighting</option>
        <option value="strategy">Strategy</option>
        <option value="shooter">Shooter</option>
        <option value="arcade">Arcade</option>
        <option value="platformer">Platformer</option>
        <option value="racing">Racing</option>
        <option value="puzzle">Puzzle</option>
        <option value="sports">Sports</option>
        <option value="indie">Indie</option>
        <option value="simulation">Simulation</option>
        <option value="casual">Casual</option>
        <option value="mmo">MMO</option>
        <option value="family">Family</option>
        <option value="card">Card</option>
        <option value="educational">Educational</option>
        <option value="boardgame">Boardgame</option>
    </select><br>
    
    <label for="platforms">Select Platforms:</label>
    <select id="platforms" name="platforms[]" multiple>
        <option value="3do">3DO</option>
        <option value="android">Android</option>
        <option value="atari 7800">Atari 7800</option>
        <option value="atari st">Atari ST</option>
        <option value="classic macintosh">Classic Macintosh</option>
        <option value="commodore / amiga">Commodore / Amiga</option>
        <option value="dreamcast">Dreamcast</option>
        <option value="game boy">Game Boy</option>
        <option value="game boy advance">Game Boy Advance</option>
        <option value="game boy color">Game Boy Color</option>
        <option value="game gear">Game Gear</option>
        <option value="game cube">GameCube</option>
        <option value="genesis">Genesis</option>
        <option value="ios">iOS</option>
        <option value="jaguar">Jaguar</option>
        <option value="linux">Linux</option>
        <option value="macos">macOS</option>
        <option value="neo geo">Neo Geo</option>
        <option value="nes">NES</option>
        <option value="nintendo 3ds">Nintendo 3DS</option>
        <option value="nintendo 64">Nintendo 64</option>
        <option value="nintendo ds">Nintendo DS</option>
        <option value="nintendo switch">Nintendo Switch</option>
        <option value="pc">PC</option>
        <option value="playstation">PlayStation</option>
        <option value="playstation 2">PlayStation 2</option>
        <option value="playstation 3">PlayStation 3</option>
        <option value="playstation 4">PlayStation 4</option>
        <option value="playstation 5">PlayStation 5</option>
        <option value="ps vita">PS Vita</option>
        <option value="psp">PSP</option>
        <option value="sega 32x">Sega 32X</option>
        <option value="sega cd">Sega CD</option>
        <option value="sega master system">Sega Master System</option>
        <option value="sega saturn">Sega Saturn</option>
        <option value="snes">SNES</option>
        <option value="web">Web</option>
        <option value="wii">Wii</option>
        <option value="wii u">Wii U</option>
        <option value="xbox">Xbox</option>
        <option value="xbox 360">Xbox 360</option>
        <option value="xbox one">Xbox One</option>
        <option value="xbox series s/x">Xbox Series S/X</option>
    </select><br>
    
    <label for="gameAge">Select Game Age:</label>
    <select id="gameAge" name="gameAge">
    	<option value="none"></option>
    	<option value="new">New</option>
    	<option value="modern">Modern</option>
    	<option value="nostalgic">Nostalgic</option>
    	<option value="vintage">Vintage</option>
        <option value="antique">Antique</option>
    </select>
    
    <button type="submit">Find Games</button>
</form>
<div class="game-container" id="result"></div>
<div id="gameModal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="closeModal()">&times;</span>
        <div id="gameDetailsContainer"></div>
    </div>
</div>
</body>
<script src="Test.js"></script>
<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
</html>