// Create the state that will contain the whole game
var mainState = {
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////BASIC FUNCTIONS//////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    init:function(){
    	
    	this.score = 0;
        this.lives = 3;    
        this.level = 1;
        this.ballStickOnPaddle = true;	
    	this.killedBricks = 0;
    	this.bricksToKill = 0;
    	this.bulletTime = 0;
    	this.levelFinished = false;
		this.paddleSpriteInitData = {
		
			key:"paddle",
			x:155,
			y:420
		
		};
		
		
    	this.levels = [
    		
    		
    		[
    		
    		'5555555555',
    		'9999999999',
    		'2222222222',
    		'8888888888',
    		'3333333333',
    		'0000000000',
    		'0000000000',
    		'0000000000',
    		'0000000000',
    		
    		],
    		
    		
    		[
    		'1000000000',
    		'1400000000',
    		'14q0000000',
    		'14q3000000',
    		'14q3500000',
    		'14q3520000',
    		'14q3528000',
    		'14q3528900',
    		'14q3528910',
    		'7777777770',
    		],
    		
	    	[
	    	
	    	'0000000000',
	    	'7777777779',
	    	'0000000000',
	    	'9999999999',
	    	'0000000000',
	    	'0777777777',
	    	'0000000000',
	    	'5555555555',
	    	'0000000000',
	    	'7777777775',
	    	],
	    	
	    	[
	    	'0000000000',
	    	'0111001110',
	    	'0222002220',
	    	'0333003330',
	    	'0444004440',
	    	'0555005550',
	    	'0888008880',
	    	'0000000000',
	    	'0000000000',
	    	'0000000000',
	    	
	    	
	    	],
	    	
	    	[
	    	'0000000000',
	    	'0055555500',
	    	'0555555550',
	    	'5565555655',
	    	'5555115555',
	    	'5555115555',
	    	'0595555950',
	    	'0059999500',
	    	'0055555500',
	    	'0005555000',
	    	
	    	],
	    	
	    	[
	    	'0000000000',
	    	'0000600000',
	    	'0005550000',
	    	'0055555000',
	    	'0555555500',
	    	'0000500000',
	    	'0000500000',
	    	'0000050000',
	    	'0000000000',
	    	'0000000000',
	    	
	    	],
	    	[
	    	'1111111111',
	    	'2222222222',
	    	'3333333333',
	    	'4444444444',
	    	'5555555555',
	    	'0000500000',
	    	'0000500000',
	    	'0000050000',
	    	'0000000000',
	    	'0000000000',
	    	
	    	],
	    	
	    		    
	    ];
    	
    },
     
    
    preload: function() {
        // Here we preload the assets
		game.load.image('paddle_small', 'assets/img/paddle_small.png');
		game.load.image('paddle', 'assets/img/paddle.png');
		game.load.image('paddle_big', 'assets/img/paddle_big.png');

		game.load.image('brick_1', 'assets/img/brick_white.png');
		game.load.image('brick_2', 'assets/img/brick_blue.png');
		game.load.image('brick_3', 'assets/img/brick_green.png');
		game.load.image('brick_4', 'assets/img/brick_orange.png');
		game.load.image('brick_5', 'assets/img/brick_red.png');
		game.load.image('brick_6', 'assets/img/star.png'); //present brick
		game.load.image('brick_7', 'assets/img/brick_gray.png'); 
		game.load.image('brick_8', 'assets/img/brick_purple.png'); 
		game.load.image('brick_9', 'assets/img/brick_yellow.png'); 
		game.load.image('brick_q', 'assets/img/brick_lightBlue.png'); 
		

		game.load.image('ball', 'assets/img/ball.png');
		game.load.image('bullet', 'assets/img/bullet.png');
		game.load.image('present1', 'assets/img/present_3balls.png');
		game.load.image('present2', 'assets/img/present_bigPaddle.png');
		game.load.image('present3', 'assets/img/present_smallPaddle.png');
		game.load.image('present4', 'assets/img/present_smashBall.png');
		game.load.image('present5', 'assets/img/present_gun.png');
		
		game.load.image('life_paddle', 'assets/img/life_paddle.png');
		game.load.image('soundOnSprite', 'assets/img/soundOn.png');
		game.load.image('soundOffSprite', 'assets/img/soundOff.png');
		
		game.load.audio('starterMusic', 'assets/music/starter.mp3');
		game.load.audio('ballHitPaddleSoundFX', 'assets/soundFX/ballHitPaddle1.wav');
		game.load.audio('ballHitBrickSoundFX', 'assets/soundFX/ballHitBrick1.wav');
		game.load.audio('lostLifeSoundFX', 'assets/soundFX/lostLife.wav');
		game.load.audio('newLevelSoundFX', 'assets/soundFX/newLevel.wav');
		
		
	},

    create: function() {

			// Here we create the game

			// Set the background color to blue
			game.stage.backgroundColor = 'black';

			// Start the Arcade physics system (for movements and collisions)
			game.physics.startSystem(Phaser.Physics.ARCADE);

			// Add the physics engine to all the game objetcs
			game.world.enableBody = true;


            this.createKeyboardControlls();
			
			this.createPaddleSprite(this.paddleSpriteInitData.x,this.paddleSpriteInitData.y,this.paddleSpriteInitData.key);
			
            this.createBallSprite();
            
            this.createBulletSprites();
            
            this.presentSprites = game.add.group();
            
			this.createScoreText();
						
			this.createLevelText();
			
			this.createSoundOnSprite();
			
			this.drawLevel(this.level,"BREAKOUT");
		
			this.drawLives();
			
			this.createAudio();
			
			
            
		},
    
    
    createBulletSprites:function(){
    
    	
    	//  Our bullet group
    	    this.bullets = game.add.group();
    	    this.bullets.enableBody = true;
    	    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    	    this.bullets.createMultiple(30, 'bullet');
    	    this.bullets.setAll('anchor.x', 0.5);
    	    this.bullets.setAll('anchor.y', 1);
    	    this.bullets.setAll('outOfBoundsKill', true);
    	    this.bullets.setAll('checkWorldBounds', true);
    
    
    },
    
    
    update: function() {
    			// Move the paddle left/right when an arrow key is pressed
    			
    					
    		if (this.leftKey.isDown) this.paddleSprite.body.velocity.x = -300;
    		else if (this.rightKey.isDown) this.paddleSprite.body.velocity.x = 300;
            
            // Stop the paddle when no key is pressed
    		else this.paddleSprite.body.velocity.x = 0;
            
            if (this.pKey.isDown) {this.setBallStickOnPaddle();} //PAUSE
            
            if (this.xKey.isDown) {
            
            	this.fireBullet();
            
            
            } //FIRE
            
            if (this.spaceKey.isDown) {
            	
            	console.log("this.lives"+this.lives);
            	
            	
            	if (this.lives == 0) 
    				
    				game.state.start('main');
    									
    				
    			
    			else if (this.levelFinished)
    				
    				this.levelFinished = false;
    				
    				
    			this.ballStickOnPaddle = false;
    			if (this.txt1) this.txt1.destroy();
    			if (this.txt2) this.txt2.destroy();
            	
            };
            
            
            if (this.ballStickOnPaddle){
            	// Give the ball some initial speed
    			this.ballSprite.x = this.paddleSprite.x;
    			this.ballSprite.y = this.paddleSprite.y-15;
    			
            }
            
            //console.log(this.presentSprite);
            
    
    		// Add collisions between the paddle and the ball
    		game.physics.arcade.collide(this.paddleSprite, this.ballSprite,this.ballHitPaddle, null, this);
    
    		// Call the 'hit' function when the ball hits a brick
    		game.physics.arcade.collide(this.ballSprite, this.brickSprites, this.ballHitBrick, null, this);
    		
    		// Add collisions between the bullet and the bricks
    		//game.physics.arcade.collide(this.bulletSprite, this.brickSprites,this.bulletHitBrick, null, this);
    		game.physics.arcade.overlap(this.bullets, this.brickSprites, this.bulletHitBrick, null, this);
    		
    		
    		// Add collisions between the paddle and the present
    		game.physics.arcade.collide(this.paddleSprite, this.presentSprites, this.paddleHitPresent, null, this);
    		
    		
    		
    		
    		
    		// Restart the game if the ball is below the paddle
    		if (this.ballSprite.y > this.paddleSprite.y) {
    				console.log("LOST LIFE");
    				this.lostLife();
    			}
    		
        },
        
        
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////BASIC FUNCTIONS END//////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////    
        
        
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////CONTROLLS////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    
    	
	soundOnSpriteClick: function(){
		
		game.sound.mute = true;
		this.soundOnSprite.kill();
		this.createSoundOffSprite();
	}, 
	
	soundOffSpriteClick: function(){
		
		game.sound.mute = false;
		this.soundOffSprite.kill();
		this.createSoundOnSprite();
	}, 

	createKeyboardControlls : function(){
		
		this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.pKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
		this.xKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
		
	},
    
    
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////CONTROLLS END////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    
	
	////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////SPRITES//////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////
	
	createPaddleSprite : function(x,y,key){
		
		
		if (this.paddleSprite) {this.paddleSprite.kill();}
		
		// Add the paddle at the bottom of the screen
		this.paddleSprite = game.add.sprite(x, y, key);
	          
		// Make sure the paddle won't move when it hits the ball
		this.paddleSprite.body.immovable = true;
	          
	    //make the paddle collide with the bounds of the world
	    this.paddleSprite.body.collideWorldBounds = true;
	    this.paddleSprite.anchor.set(0.5);
	
	},
	
	createBallSprite: function(){
		
		
		// Add the ball
		this.ballSprite = game.add.sprite(155, this.paddleSprite.y-15, 'ball');
        this.ballSprite.anchor.set(0.5);
           
        this.ballSprite.body.velocity.x = 0;
		this.ballSprite.body.velocity.y = -200;
        
          
		// Make sure the ball will bounce when hitting something
		this.ballSprite.body.bounce.setTo(1);
		this.ballSprite.body.collideWorldBounds = true;
	
	
	},
	
	
	
	fireBullet:function(){
	
	
		//  To avoid them being allowed to fire too fast we set a time limit
		    if (game.time.now > this.bulletTime)
		    {
		        //  Grab the first bullet we can from the pool
		        bullet = this.bullets.getFirstExists(false);
		
		        if (bullet)
		        {
		            //  And fire it
		            bullet.reset(this.paddleSprite.x, this.paddleSprite.y-27);
		            bullet.body.velocity.y = -400;
		            this.bulletTime = game.time.now + 400;
		        }
		    }
	
	
	
	},
	
	
	createPresentSprite:function(brick){
	    
	    var pointer = Math.floor(Math.random() * 5) + 1;
	    
	    console.log("pointer="+pointer)
	    
	    
		var presentSprite = game.add.sprite(brick.x, brick.y+13, 'present'+pointer );
		presentSprite.anchor.set(0.5);
		
		   
		presentSprite.body.velocity.x = 0;
		presentSprite.body.velocity.y = 200;
		
		
		this.presentSprites.add(presentSprite);
	
	},
	createSoundOnSprite : function(){
		
	 	////sound sprites
		
		this.soundOnSprite = game.add.sprite(275, 450, 'soundOnSprite');
		this.soundOnSprite.anchor.set(0.5);
		this.soundOnSprite.inputEnabled = true;
		this.soundOnSprite.events.onInputDown.add(this.soundOnSpriteClick, this);
	
	},
	
	createSoundOffSprite : function(){
	
		this.soundOffSprite = game.add.sprite(275, 450, 'soundOffSprite');
		this.soundOffSprite.anchor.set(0.5);
		this.soundOffSprite.inputEnabled = true;
		this.soundOffSprite.events.onInputDown.add(this.soundOffSpriteClick, this);
	
	},
	
	drawLives : function(){
		
		if (this.life_paddles) {
			this.life_paddles.forEach(function (c) { c.kill(); });	
		}
			
		
		this.life_paddles = game.add.group();
		
		for (var i = 0; i < this.lives; i++) {
			    	        
			  var life_paddle = game.add.sprite(29*i + 10, 450, 'life_paddle');
			  this.life_paddles.add(life_paddle);
			 
		}
		
	},
	
	drawLevel: function(num,txt){
		
		this.bricksToKill = 0;
		this.brickSprites = game.add.group();
		
		var level = this.levels[num-1];
		
		for (var i = 0; i < level.length; i++) {
			    for (var j = 0; j < level[i].length; j++) {
					
			        if (level[i][j] != 0) {
			        	
			        	if (level[i][j] != 7) {
			        		this.bricksToKill++;
			        	}
			        	
			        	var brick = game.add.sprite(7+j*30, 45+i*30, 'brick_'+level[i][j]);
			        	brick.body.immovable = true;
			        	this.brickSprites.add(brick);	
			        	
			        }
			        
			 
			    }
			}
		this.LevelText.text = this.level;
		
		
		this.txt1 = game.add.text(65, 80, txt,{font: "30px Arial",fill: "green",backgroundColor:"black"});
		this.txt2 = game.add.text(51, 115, " hit SPACE to start Level:"+this.level,{font: "18px Arial",fill: "white",backgroundColor:"black"});
		
		//alert(this.bricksToKill);
		
	},
	
	
	////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////SPRITES END///////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////TEXT/////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////
	
	createScoreText:function(){
		
		////SCORE//////
		
		this.scoreLabel = game.add.text(10, 5, "Score:",{font: "22px Arial",fill: "white"});
		this.scoreText = game.add.text(80, 5, this.score,{font: "22px Arial",fill: "yellow"});
		
	},
	
	createLevelText: function(){
		
		////LEVEL////
		this.LevelLabel = game.add.text(220, 5, "Level:",{font: "22px Arial",fill: "white"});
		this.LevelText = game.add.text(280, 5, this.level,{font: "22px Arial",fill: "yellow"});
		
	},
	
	
	
	////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////TEXT END/////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	
	/////////////////////////////////////////////////////////////////////////////////////
	////////////////////////AUDIO////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////
	
		
		
	createAudio : function(){
		
		
		this.starterMusic = game.add.audio('starterMusic');
		this.ballHitPaddleSoundFX = game.add.audio('ballHitPaddleSoundFX');
		this.ballHitBrickSoundFX = game.add.audio('ballHitBrickSoundFX');
		this.lostLifeSoundFX = game.add.audio('lostLifeSoundFX');
		this.newLevelSoundFX = game.add.audio('newLevelSoundFX');
		//this.starterMusic.play();

	
	},
	
	
	/////////////////////////////////////////////////////////////////////////////////////
	////////////////////////AUDIO END////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////
	
	
    
    
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////COLLISIONS START////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    
    ballHitPaddle: function(paddle, ball) {
    		
    		this.ballHitPaddleSoundFX.play();
    		
    		var diff = 0;
    
    	    if (ball.x < paddle.x)
    	    {
    	        //console.log("LEFT");
    	        //console.log("ball.x="+ball.x);
    	        //console.log("paddle.x ="+ paddle.x);
    	        //alert();
    	        //  Ball is on the left-hand side of the paddle
    	        diff = paddle.x - ball.x;
    	        ball.body.velocity.x = (-5 * diff);
    	    }
    	    else if (ball.x > paddle.x)
    	    {
    	    	//console.log("RIGHT");
    	        //console.log("ball.x="+ball.x);
    	        //console.log("paddle.x ="+ paddle.x);
    	        //  Ball is on the right-hand side of the paddle
    	        //alert();
    	        diff = ball.x - paddle.x;
    	        ball.body.velocity.x = (5* diff);
    	    }
    	    else
    	    {
    	        //console.log("MIDDLE");
    	        //console.log("ball.x="+ball.x);
    	        //console.log("paddle.x ="+ paddle.x);
    	        //alert();
    	        //  Ball is perfectly in the middle
    	        //  Add a little random X to stop it bouncing straight up!
    	        ball.body.velocity.x = 5 + Math.random() * 8;
    	    }
    		
    		
    },
    
    paddleHitPresent:function(paddle, present){//****
         
    	
    	console.log("COLLISION");
    	console.log("present.key="+present.key);
    	present.kill();
    	console.log("presentSprites.length="+this.presentSprites.length);
    	
    	if (present.key == "present2") {
    		this.createPaddleSprite(paddle.x,paddle.y,'paddle_big');
    	}
    	
    	else if (present.key == "present3") {
    		this.createPaddleSprite(paddle.x,paddle.y,'paddle_small');
    	}
    	
    	else {
    		this.createPaddleSprite(paddle.x,paddle.y,'paddle');
    	
    	}
    	
    	
    
    },
    
        
	// New function that removes a brick from the game
	ballHitBrick: function(ball, brick) {
		 
		 this.ballHitBrickSoundFX.play();
		 this.checkHitBrick(brick);
		 
	},
	
	bulletHitBrick: function(bullet, brick) {
		 
		 //this.ballHitBrickSoundFX.play();
		 
		 bullet.kill();
		 this.checkHitBrick(brick);
		 
	},
	
	checkHitBrick: function(brick) {
		 
		 //this.ballHitBrickSoundFX.play();
		 
		 if (brick.key != 'brick_7'){
		 	brick.kill();
		 	this.score++;
		 	this.scoreText.text = this.score;
		 	this.killedBricks++;
		 	
		 }
		 
			     
	     if (brick.key == "brick_6") {
	     
	     	this.createPresentSprite(brick);
	     
	     
	     }
	     
	     
	     //console.log("this.killedBricks="+this.killedBricks+" this.brickSprites.length="+ this.brickSprites.length);
	     
	     
	     if (this.killedBricks >= this.bricksToKill) { //changeLevel
	     //if (this.killedBricks >= 1) { 
	     		
	     		this.brickSprites.forEach(function (c) { c.kill(); });//for to kill also the unbreakable bricks
	     		
				this.newLevelSoundFX.play();
				this.killedBricks = 0;
	     		this.levelFinished = true;
	     		
	     		this.setBallStickOnPaddle();
	     			     		
	     		//console.log("this.ballSprite.y="+this.ballSprite.y+"this.paddleSprite.y="+this.paddleSprite.y);
	     		
	     		this.level++;
	     		
	     		if (this.level > this.levels.length) {
	     			
	     			this.level = 1;
	     			
	     			}
	     		
	     		var that = this;
	     		
	     		setTimeout(function(){ that.drawLevel(that.level,"WELL DONE!!"); }, 100);
	     		
	     	
	     	}
	     // alert(this.brickSprites.length);
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////COLLISIONS END///////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	setBallStickOnPaddle:function(){
	
		this.ballSprite.body.velocity.y = -200;
		this.ballStickOnPaddle = true;
	
	
	},
	
		
	
	lostLife : function(){
		
		
		this.lostLifeSoundFX.play();
		
		this.setBallStickOnPaddle();
		
		this.ballSprite.body.velocity.x = 0;
		
		this.lives--;
		this.drawLives();
		if (this.lives == 0) 
			{
				this.txt1 = game.add.text(65, 80, "GAME OVER",{font: "30px Arial",fill: "red",backgroundColor:"black"});
				this.txt2 = game.add.text(77, 115, " hit SPACE to start ",{font: "18px Arial",fill: "green",backgroundColor:"black"});
				
			}
		else {
			
				this.txt1 = game.add.text(65, 80, "LOST LIFE",{font: "30px Arial",fill: "red",backgroundColor:"black"});
				this.txt2 = game.add.text(64, 115, " hit SPACE to start ",{font: "18px Arial",fill: "green",backgroundColor:"black"});
			
		}
			
		
		
	}
	

};

// Initialize the game and start our state
var game = new Phaser.Game(310, 475);
game.state.add('main', mainState);
game.state.start('main');